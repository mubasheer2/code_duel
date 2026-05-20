import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { code, language, problemTitle, problemDescription, testCases } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a code judge. You analyze code and determine if it correctly solves a given problem.
You MUST respond with ONLY valid JSON, no markdown, no explanation.

Response format:
{
  "results": [
    {"passed": true, "actualOutput": "expected value", "explanation": "brief note"},
    {"passed": false, "actualOutput": "wrong value", "explanation": "why it failed"}
  ],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)"
}`;

    const userPrompt = `Analyze this ${language} code for the problem "${problemTitle}":

Problem: ${problemDescription}

Code:
\`\`\`${language}
${code}
\`\`\`

Test cases to validate:
${testCases.map((tc: any, i: number) => `${i + 1}. Input: ${tc.input} → Expected Output: ${tc.expectedOutput}`).join('\n')}

For each test case, mentally trace the code execution and determine if the output matches. Be strict - the code must produce the exact expected output.
Return ONLY the JSON response.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "{}";
    
    // Clean markdown fences
    content = content.replace(/^```\w*\n?/, '').replace(/\n?```$/, '').trim();
    
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response:", content);
      parsed = {
        results: testCases.map(() => ({ passed: false, actualOutput: "AI validation error", explanation: "Could not parse AI response" })),
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("validate-code error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
