import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = function ({ children }) {
  const [theme, setTheme] = useState(() => {
    const storeTheme = localStorage.getItem("theme");

    try {
      if (storeTheme) {
        return JSON.parse(storeTheme);
      }
      return "light";
    } catch {
      return "light";
    }
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
