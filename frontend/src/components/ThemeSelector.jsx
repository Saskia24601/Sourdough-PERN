import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import React from "react";

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();
  console.log("Current theme:", theme);

  return (
    <div className="dropdown dropdown-end">
      {/* Dropdown trigger */}

      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="h-5 w-5" />
      </button>

      {/* Dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-26 border-base-content/10"
      >
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-colors
              ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }`}
            onClick={() => setTheme(themeOption.name)}
          >
            <PaletteIcon className="h-4 w-4" />
            <span className="text-sm font-semibold">{themeOption.label}</span>

            {/* Theme preview */}
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, index) => (
                <span
                  key={index}
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
