import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="h-10 w-10 p-2 m-3 rounded-lg bg-surface dark:bg-surface cursor-pointer hover:bg-hover"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <i className="fa-solid fa-sun text-text-secondary"></i>
      ) : (
        <i className="fa-solid fa-moon"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
