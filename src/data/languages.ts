export type Language = 'javascript' | 'python' | 'cpp' | 'java' | 'go' | 'rust';

export interface LanguageConfig {
  id: Language;
  name: string;
  extension: string;
  monacoId: string;
  icon: string;
}

export const languages: LanguageConfig[] = [
  { id: 'javascript', name: 'JavaScript', extension: 'js', monacoId: 'javascript', icon: '🟨' },
  { id: 'python', name: 'Python', extension: 'py', monacoId: 'python', icon: '🐍' },
  { id: 'cpp', name: 'C++', extension: 'cpp', monacoId: 'cpp', icon: '⚡' },
  { id: 'java', name: 'Java', extension: 'java', monacoId: 'java', icon: '☕' },
  { id: 'go', name: 'Go', extension: 'go', monacoId: 'go', icon: '🔵' },
  { id: 'rust', name: 'Rust', extension: 'rs', monacoId: 'rust', icon: '🦀' },
];

export const getLanguageById = (id: Language): LanguageConfig | undefined => {
  return languages.find(l => l.id === id);
};
