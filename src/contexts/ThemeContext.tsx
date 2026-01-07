import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Apply theme to document
  useEffect(() => {
    // Force light mode for the professional aesthetic
    document.documentElement.classList.remove('dark');
    setIsDarkMode(false);
  }, [isDarkMode]);

  const toggleTheme = () => {
    // Disabled theme toggling for premium light aesthetic
    console.log('Theme toggling disabled for EazyPost LLC brand consistency.');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;