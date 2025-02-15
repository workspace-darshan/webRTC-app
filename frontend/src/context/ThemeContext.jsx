import { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem } from "../services/utils";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Create the wave effect from the top-right corner
    const wave = document.createElement("div");
    wave.classList.add("theme-transition");

    // Set the wave color dynamically based on the new theme
    wave.style.setProperty(
      "--wave-color",
      newTheme === "dark" ? "#121212" : "#ffffff"
    );

    // **Move the wave to the top-right corner**
    wave.style.top = "0";
    wave.style.right = "0";
    wave.style.transform = "translate(50%, -50%)";

    document.body.appendChild(wave);

    // **Change the theme DURING the wave expansion**
    setTimeout(() => {
      document.documentElement.setAttribute("data-theme", newTheme);
      setTheme(newTheme);
      setItem("theme", newTheme);
    }, 150); // Apply theme **before** wave fully expands

    // Remove wave after animation completes
    setTimeout(() => {
      wave.remove();
    }, 600);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
