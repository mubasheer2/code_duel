import { motion } from 'framer-motion';
import { Swords, Zap, Brain, Trophy, Clock, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Title */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Brain className="w-12 h-12 text-neon-magenta" />
              <Swords className="w-16 h-16 text-neon-cyan animate-pulse" />
              <Code className="w-12 h-12 text-neon-cyan" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-glow-cyan mb-4">
              AI <span className="text-neon-magenta text-glow-magenta">vs</span> HUMAN
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground/90">
              CODING ARENA
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Enter the ultimate coding battleground. Compete against cutting-edge AI in real-time algorithm challenges.
            Prove that human creativity still reigns supreme.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="arena"
              size="xl"
              onClick={() => navigate('/arena')}
              className="group"
            >
              <Swords className="w-6 h-6 group-hover:animate-pulse" />
              ENTER THE ARENA
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn the Rules
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Code, label: '1000+ Problems', color: 'text-neon-cyan' },
              { icon: Zap, label: '6 Languages', color: 'text-neon-magenta' },
              { icon: Clock, label: 'Real-time Battles', color: 'text-neon-green' },
              { icon: Trophy, label: 'Instant Results', color: 'text-winner' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="p-4 rounded-lg bg-card/50 border border-arena-border hover:border-primary/50 transition-colors"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
