import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QuranSettingsProvider } from "@/contexts/QuranSettingsContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import BottomNavigation from "@/components/BottomNavigation";
import Home from "@/pages/Home";
import Library from "@/pages/Library";
import QuranSurahList from "@/pages/QuranSurahList";
import QuranReader from "@/pages/QuranReader";
import HadithBooksList from "@/pages/HadithBooksList";
import HadithReader from "@/pages/HadithReader";
import BooksLibrary from "@/pages/BooksLibrary";
import BookPagesReader from "@/pages/BookPagesReader";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/library" component={Library} />
      <Route path="/library/quran" component={QuranSurahList} />
      <Route path="/library/quran/:surahId" component={QuranReader} />
      <Route path="/library/hadith" component={HadithBooksList} />
      <Route path="/library/hadith/:bookId" component={HadithReader} />
      <Route path="/library/books" component={BooksLibrary} />
      <Route path="/library/books/:bookId" component={BookPagesReader} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "5rem",
    "--sidebar-width-icon": "5rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <QuranSettingsProvider>
          <TooltipProvider>
            <SidebarProvider style={style as React.CSSProperties}>
              <div className="flex h-screen w-full">
                <div className="hidden lg:block">
                  <AppSidebar />
                </div>
                <main className="flex-1 overflow-auto">
                  <Router />
                </main>
                <div className="lg:hidden">
                  <BottomNavigation />
                </div>
              </div>
            </SidebarProvider>
            <Toaster />
          </TooltipProvider>
        </QuranSettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
