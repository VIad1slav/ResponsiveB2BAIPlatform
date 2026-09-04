import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

ThemeContext.displayName = 'ThemeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load theme from localStorage or default to 'light'
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('plon-theme');
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        return savedTheme as Theme;
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
    return 'light';
  });
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  // Wrapper to save theme to localStorage whenever it changes
  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem('plon-theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
      // Still update state even if localStorage fails
      setThemeState(newTheme);
    }
  };

  useEffect(() => {
    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'system') {
      setResolvedTheme(systemPrefersDark ? 'dark' : 'light');
    } else {
      setResolvedTheme(theme);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

// Hook with HMR safety - provides fallback values if context is unavailable
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default values during HMR to prevent crashes
    // This is expected behavior during development hot reloading
    // Try to get theme from localStorage for fallback
    let fallbackTheme: Theme = 'light';
    try {
      const savedTheme = localStorage.getItem('plon-theme');
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        fallbackTheme = savedTheme as Theme;
      }
    } catch (error) {
      // Ignore localStorage errors during HMR
    }
    
    return {
      theme: fallbackTheme,
      resolvedTheme: fallbackTheme === 'system' ? 'light' : fallbackTheme,
      setTheme: (newTheme: Theme) => {
        // Even during HMR, try to save to localStorage
        try {
          localStorage.setItem('plon-theme', newTheme);
        } catch (error) {
          console.warn('Failed to save theme during HMR:', error);
        }
      },
    };
  }
  return context;
};