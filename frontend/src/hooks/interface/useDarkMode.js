// react
import { useEffect } from "react";

function useDarkMode(theme) {
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
}

export default useDarkMode;
