import { motion } from 'framer-motion';
import { Play, Code, Timer, Trophy } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: Play,
    title: 'Start Battle',
    description: 'Choose your programming language and enter the arena. A random algorithm problem will be assigned.',
    gradient: 'from-neon-cyan to-neon-cyan/50',
  },
  {
    step: 2,
    icon: Code,
    title: 'Code Solution',
    description: 'Write your solution in the split-screen editor while watching the AI code in real-time.',
    gradient: 'from-neon-magenta to-neon-magenta/50',
  },
  {
    step: 3,
    icon: Timer,
    title: 'Submit & Analyze',
    description: 'Submit your code. Both solutions are analyzed for time/space complexity and correctness.',
    gradient: 'from-neon-green to-neon-green/50',
  },
  {
    step: 4,
    icon: Trophy,
    title: 'See Results',
    description: 'View detailed comparison metrics and find out who won the battle!',
    gradient: 'from-winner to-winner/50',
  },
];

const BattleFlow = () => {
  return (
    <section className="py-24 relative bg-arena-darker/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-glow-magenta mb-4">
            HOW IT WORKS
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four simple steps to prove your coding superiority against artificial intelligence.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan via-neon-magenta to-winner transform -translate-y-1/2 z-0" />

          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className={`relative mb-6`}>
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center font-display font-bold text-primary">
                    {item.step}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BattleFlow;
