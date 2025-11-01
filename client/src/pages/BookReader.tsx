import { useState } from "react";
import { ArrowLeft, Search, MoreVertical, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Bookmark, Moon } from "lucide-react";
import { useLocation, useParams } from "wouter";
import FloatingActionButton from "@/components/FloatingActionButton";
import { useTheme } from "@/components/ThemeProvider";

//todo: remove mock functionality
const mockChapters = [
  { id: "1", title: "Introduction", completed: true },
  { id: "2", title: "Chapter 1: The Beginning", completed: false },
  { id: "3", title: "Chapter 2: Fundamentals", completed: false },
  { id: "4", title: "Chapter 3: Deep Dive", completed: false },
];

const arabicContent = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ أَشْرَفِ الْأَنْبِيَاءِ وَالْمُرْسَلِينَ، نَبِيِّنَا مُحَمَّدٍ وَعَلَىٰ آلِهِ وَصَحْبِهِ أَجْمَعِينَ.

هذا كتاب عظيم في التفسير، يشرح معاني القرآن الكريم بأسلوب واضح ومفصل. إن فهم كلام الله تعالى هو من أعظم العلوم وأشرفها، وقد بذل العلماء جهودًا كبيرة في تفسير آيات الكتاب الحكيم.

في هذا الباب، نتناول أصول التفسير وقواعده، ونبين كيف يفهم المسلم كتاب ربه بالطريقة الصحيحة. إن القرآن الكريم هو دستور المسلمين ومنهج حياتهم، وفيه الهداية والنور.`;

export default function BookReader() {
  const { bookId } = useParams();
  const [, setLocation] = useLocation();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [showSidebar, setShowSidebar] = useState(true);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const themes: Array<"light" | "dark" | "sepia"> = ["dark", "light", "sepia"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div 
        className="sticky top-0 z-40 h-14 flex items-center justify-between px-4 border-b border-border"
        style={{ backgroundColor: '#2C3E3F' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/books")}
            className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">Tafseer Ibn Kathir</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-search"
          >
            <Search className="w-5 h-5 text-primary-foreground" />
          </button>
          <button
            className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-menu"
          >
            <MoreVertical className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && (
          <div 
            className="w-[280px] border-r border-border overflow-y-auto"
            style={{ backgroundColor: '#242F30' }}
            data-testid="sidebar-chapters"
          >
            <div className="p-4 space-y-1">
              {mockChapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => setCurrentChapter(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all hover-elevate ${
                    currentChapter === index ? 'bg-accent' : ''
                  }`}
                  data-testid={`chapter-${index}`}
                >
                  <div className="flex items-center gap-2">
                    {chapter.completed && (
                      <span className="text-primary-foreground text-sm">✓</span>
                    )}
                    {currentChapter === index && (
                      <span className="text-primary-foreground text-sm">→</span>
                    )}
                    <span className="text-sm text-foreground">{chapter.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto relative">
          <div 
            className="max-w-[800px] mx-auto px-8 md:px-12 py-12"
            style={{ 
              fontSize: `${fontSize}px`,
              lineHeight: '2.0',
              direction: 'rtl',
              textAlign: 'right'
            }}
          >
            <div className="font-arabic space-y-6" data-testid="reading-content">
              {arabicContent.split('\n\n').map((para, i) => (
                <p key={i} className="text-foreground">{para}</p>
              ))}
            </div>
          </div>
          
          <div 
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl flex items-center gap-4"
            style={{ 
              backgroundColor: 'rgba(44, 62, 63, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
            data-testid="page-controls"
          >
            <button
              onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
              className="flex items-center gap-2 text-sm text-white hover-elevate px-3 py-1.5 rounded-lg"
              disabled={currentChapter === 0}
              data-testid="button-previous"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <span className="text-sm text-white" data-testid="text-page-number">
              {currentChapter + 1}/{mockChapters.length}
            </span>
            
            <button
              onClick={() => setCurrentChapter(Math.min(mockChapters.length - 1, currentChapter + 1))}
              className="flex items-center gap-2 text-sm text-white hover-elevate px-3 py-1.5 rounded-lg"
              disabled={currentChapter === mockChapters.length - 1}
              data-testid="button-next"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="fixed right-6 top-24 flex flex-col gap-3" data-testid="floating-actions">
            <FloatingActionButton
              icon={<ZoomOut className="w-5 h-5" />}
              onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              testId="button-font-decrease"
            />
            <FloatingActionButton
              icon={<ZoomIn className="w-5 h-5" />}
              onClick={() => setFontSize(Math.min(22, fontSize + 2))}
              testId="button-font-increase"
            />
            <FloatingActionButton
              icon={<Bookmark className="w-5 h-5" />}
              onClick={() => console.log('Bookmark added')}
              testId="button-bookmark"
            />
            <FloatingActionButton
              icon={<Moon className="w-5 h-5" />}
              onClick={toggleTheme}
              testId="button-theme-toggle"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
