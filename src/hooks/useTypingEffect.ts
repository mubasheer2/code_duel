import { useState, useEffect, useCallback } from 'react';

interface UseTypingEffectProps {
  text: string;
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
}

export const useTypingEffect = ({
  text,
  speed = 30,
  startDelay = 500,
  enabled = true,
}: UseTypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayedText('');
      setIsTyping(false);
      setIsComplete(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(false);
    setIsComplete(false);

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay, enabled]);

  const reset = useCallback(() => {
    setDisplayedText('');
    setIsTyping(false);
    setIsComplete(false);
  }, []);

  return {
    displayedText,
    isTyping,
    isComplete,
    reset,
  };
};
