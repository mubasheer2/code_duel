import Hero from '@/components/home/Hero';
import Rules from '@/components/home/Rules';
import BattleFlow from '@/components/home/BattleFlow';
import Footer from '@/components/home/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Rules />
      <BattleFlow />
      <Footer />
    </main>
  );
};

export default Index;
