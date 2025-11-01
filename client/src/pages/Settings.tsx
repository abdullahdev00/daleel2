import { useTheme } from "@/components/ThemeProvider";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-serif font-semibold text-foreground mb-6">Settings</h1>
        
        <div className="bg-card border border-card-border rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Appearance</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-4 h-4 text-primary"
                  data-testid="radio-dark"
                />
                <span className="text-foreground">Dark Mode</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === "light"}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-4 h-4 text-primary"
                  data-testid="radio-light"
                />
                <span className="text-foreground">Light Mode</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="sepia"
                  checked={theme === "sepia"}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-4 h-4 text-primary"
                  data-testid="radio-sepia"
                />
                <span className="text-foreground">Sepia Mode (Reading)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
