import { motion } from 'framer-motion';
import { languages, Language } from '@/data/languages';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  selected: Language;
  onSelect: (language: Language) => void;
  disabled?: boolean;
}

const LanguageSelector = ({ selected, onSelect, disabled = false }: LanguageSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((lang) => (
        <motion.button
          key={lang.id}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={() => !disabled && onSelect(lang.id)}
          disabled={disabled}
          className={cn(
            'px-4 py-2 rounded-lg font-mono text-sm font-medium transition-all duration-200 flex items-center gap-2',
            selected === lang.id
              ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(185_100%_50%/0.4)]'
              : 'bg-card border border-arena-border text-muted-foreground hover:border-primary/50 hover:text-foreground',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span>{lang.icon}</span>
          <span>{lang.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSelector;
