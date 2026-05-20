import { motion } from 'framer-motion';
import { Shield, Clock, Code2, Zap, Trophy, Scale } from 'lucide-react';

const rules = [
  {
    icon: Code2,
    title: 'Same Challenge',
    description: 'Both you and the AI receive identical coding problems with the same constraints and test cases.',
    color: 'text-neon-cyan',
  },
  {
    icon: Clock,
    title: 'Time Limit',
    description: 'Each battle has a 5-minute countdown. Solve the problem before time runs out!',
    color: 'text-neon-orange',
  },
  {
    icon: Shield,
    title: 'Fair Play',
    description: 'No external tools allowed. Just you, your skills, and the code editor.',
    color: 'text-neon-green',
  },
  {
    icon: Scale,
    title: 'Scoring System',
    description: 'Winners are determined by time complexity, space complexity, and execution speed.',
    color: 'text-neon-magenta',
  },
  {
    icon: Zap,
    title: 'Real-time Analysis',
    description: 'Watch complexity metrics update live as you and AI write your solutions.',
    color: 'text-neon-cyan',
  },
  {
    icon: Trophy,
    title: 'Victory Conditions',
    description: 'Beat the AI with a more efficient solution to claim victory and bragging rights!',
    color: 'text-winner',
  },
];

const Rules = () => {
  return (
    <section id="rules" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-glow-cyan mb-4">
            BATTLE RULES
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Master these rules to dominate the arena and prove your coding supremacy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-xl bg-card/50 border border-arena-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(185_100%_50%/0.1)]"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <rule.icon className={`w-10 h-10 ${rule.color} mb-4`} />
              <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                {rule.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {rule.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rules;
