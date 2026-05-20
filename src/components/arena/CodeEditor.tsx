import { useCallback, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Language } from '@/data/languages';

interface CodeEditorProps {
  language: Language;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  isAI?: boolean;
}

const CodeEditor = ({ language, value, onChange, readOnly = false, isAI = false }: CodeEditorProps) => {
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorMount = useCallback(() => {
    setIsEditorReady(true);
  }, []);

  const handleChange = useCallback((newValue: string | undefined) => {
    if (onChange && newValue !== undefined) {
      onChange(newValue);
    }
  }, [onChange]);

  const getMonacoLanguage = (lang: Language): string => {
    const mapping: Record<Language, string> = {
      javascript: 'javascript',
      python: 'python',
      cpp: 'cpp',
      java: 'java',
      go: 'go',
      rust: 'rust',
    };
    return mapping[lang];
  };

  return (
    <div className={`h-full w-full rounded-lg overflow-hidden border ${isAI ? 'border-ai/30' : 'border-human/30'}`}>
      <Editor
        height="100%"
        language={getMonacoLanguage(language)}
        value={value}
        onChange={handleChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          bracketPairColorization: { enabled: true },
        }}
      />
      {!isEditorReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <div className="text-muted-foreground animate-pulse">Loading editor...</div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
