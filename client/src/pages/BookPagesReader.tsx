import { ArrowLeft } from "lucide-react";
import { useLocation, useParams } from "wouter";
import PageCard from "@/components/PageCard";

// Mock book pages data - in a real app this would come from API
const mockBookPages = [
  {
    id: "1",
    pageNumber: 1,
    bookTitle: "Tafseer Ibn Kathir",
    content: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ أَشْرَفِ الْأَنْبِيَاءِ وَالْمُرْسَلِينَ، نَبِيِّنَا مُحَمَّدٍ وَعَلَىٰ آلِهِ وَصَحْبِهِ أَجْمَعِينَ.\n\nهذا كتاب عظيم في التفسير، يشرح معاني القرآن الكريم بأسلوب واضح ومفصل. إن فهم كلام الله تعالى هو من أعظم العلوم وأشرفها، وقد بذل العلماء جهودًا كبيرة في تفسير آيات الكتاب الحكيم."
  },
  {
    id: "2",
    pageNumber: 2,
    bookTitle: "Tafseer Ibn Kathir",
    content: "في هذا الباب، نتناول أصول التفسير وقواعده، ونبين كيف يفهم المسلم كتاب ربه بالطريقة الصحيحة. إن القرآن الكريم هو دستور المسلمين ومنهج حياتهم، وفيه الهداية والنور.\n\nومن أهم قواعد التفسير:\n١. الرجوع إلى تفسير القرآن بالقرآن\n٢. الرجوع إلى السنة النبوية\n٣. الرجوع إلى أقوال الصحابة والتابعين"
  },
  {
    id: "3",
    pageNumber: 3,
    bookTitle: "Tafseer Ibn Kathir",
    content: "وَمِنَ الْمُهِمِّ أَنْ نَفْهَمَ السِّيَاقَ الَّذِي نَزَلَتْ فِيهِ الْآيَاتُ، فَإِنَّ لِكُلِّ آيَةٍ سَبَبَ نُزُولٍ وَظُرُوفًا خَاصَّةً.\n\nكَمَا يَجِبُ عَلَى الْمُفَسِّرِ أَنْ يَكُونَ عَلِيمًا بِاللُّغَةِ الْعَرَبِيَّةِ وَأَسَالِيبِهَا وَبَلَاغَتِهَا، لِأَنَّ الْقُرْآنَ نَزَلَ بِلِسَانٍ عَرَبِيٍّ مُبِينٍ."
  }
];

export default function BookPagesReader() {
  const { bookId } = useParams();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setLocation("/library/books")}
            className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Tafseer Ibn Kathir</h1>
            <p className="text-sm text-muted-foreground">By Imam Ibn Kathir</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-6 space-y-4 max-w-4xl mx-auto">
        {mockBookPages.map((page) => (
          <PageCard
            key={page.id}
            pageNumber={page.pageNumber}
            content={page.content}
            bookTitle={page.bookTitle}
          />
        ))}
      </div>
    </div>
  );
}
