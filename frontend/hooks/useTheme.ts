import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('light');

  // Theme hook logic

  return {
    theme,
    setTheme,
  };
}
