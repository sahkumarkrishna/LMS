import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider"; // Correct import

const DarkMode = () => {
  const { theme, setTheme } = useTheme(); // ✅ Added theme state for better handling

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          {/* Sun (Light Mode) */}
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
              theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
          />
          {/* Moon (Dark Mode) */}
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
              theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          aria-label="Light Mode"
        >
          🌞 Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          aria-label="Dark Mode"
        >
          🌙 Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          aria-label="System Mode"
        >
          🖥️ System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DarkMode;
