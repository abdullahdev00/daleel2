import { 
  type Book, type InsertBook, 
  type BookPage, type InsertBookPage,
  type QuranVerse, type InsertQuranVerse,
  type Hadith, type InsertHadith
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getBooks(): Promise<Book[]>;
  getBook(id: string): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  
  getBookPages(bookId: string): Promise<BookPage[]>;
  getBookPage(id: string): Promise<BookPage | undefined>;
  createBookPage(page: InsertBookPage): Promise<BookPage>;
  
  getQuranVerses(surahNumber?: number): Promise<QuranVerse[]>;
  getQuranVerse(id: string): Promise<QuranVerse | undefined>;
  createQuranVerse(verse: InsertQuranVerse): Promise<QuranVerse>;
  
  getHadiths(book?: string): Promise<Hadith[]>;
  getHadith(id: string): Promise<Hadith | undefined>;
  createHadith(hadith: InsertHadith): Promise<Hadith>;
}

export class MemStorage implements IStorage {
  private books: Map<string, Book>;
  private bookPages: Map<string, BookPage>;
  private quranVerses: Map<string, QuranVerse>;
  private hadiths: Map<string, Hadith>;

  constructor() {
    this.books = new Map();
    this.bookPages = new Map();
    this.quranVerses = new Map();
    this.hadiths = new Map();
    this.initializeMockData();
  }

  private async initializeMockData() {
    // Mock Books
    const book1 = await this.createBook({
      title: "Tafseer Ibn Kathir",
      author: "Imam Ibn Kathir",
      category: "Tafseer",
      totalPages: 10,
      description: "Comprehensive Quranic exegesis",
      language: "Arabic/English"
    });

    const book2 = await this.createBook({
      title: "Riyadh as-Salihin",
      author: "Imam Nawawi",
      category: "Hadith Collection",
      totalPages: 8,
      description: "Gardens of the Righteous",
      language: "Arabic/English"
    });

    // Mock Book Pages for Tafseer Ibn Kathir
    await this.createBookPage({
      bookId: book1.id,
      pageNumber: 1,
      content: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ أَشْرَفِ الْأَنْبِيَاءِ وَالْمُرْسَلِينَ، نَبِيِّنَا مُحَمَّدٍ وَعَلَىٰ آلِهِ وَصَحْبِهِ أَجْمَعِينَ.\n\nهذا كتاب عظيم في التفسير، يشرح معاني القرآن الكريم بأسلوب واضح ومفصل. إن فهم كلام الله تعالى هو من أعظم العلوم وأشرفها، وقد بذل العلماء جهودًا كبيرة في تفسير آيات الكتاب الحكيم."
    });

    await this.createBookPage({
      bookId: book1.id,
      pageNumber: 2,
      content: "في هذا الباب، نتناول أصول التفسير وقواعده، ونبين كيف يفهم المسلم كتاب ربه بالطريقة الصحيحة. إن القرآن الكريم هو دستور المسلمين ومنهج حياتهم، وفيه الهداية والنور.\n\nومن أهم قواعد التفسير:\n١. الرجوع إلى تفسير القرآن بالقرآن\n٢. الرجوع إلى السنة النبوية\n٣. الرجوع إلى أقوال الصحابة والتابعين"
    });

    await this.createBookPage({
      bookId: book1.id,
      pageNumber: 3,
      content: "وَمِنَ الْمُهِمِّ أَنْ نَفْهَمَ السِّيَاقَ الَّذِي نَزَلَتْ فِيهِ الْآيَاتُ، فَإِنَّ لِكُلِّ آيَةٍ سَبَبَ نُزُولٍ وَظُرُوفًا خَاصَّةً.\n\nكَمَا يَجِبُ عَلَى الْمُفَسِّرِ أَنْ يَكُونَ عَلِيمًا بِاللُّغَةِ الْعَرَبِيَّةِ وَأَسَالِيبِهَا وَبَلَاغَتِهَا، لِأَنَّ الْقُرْآنَ نَزَلَ بِلِسَانٍ عَرَبِيٍّ مُبِينٍ."
    });

    // Mock Book Pages for Riyadh as-Salihin
    await this.createBookPage({
      bookId: book2.id,
      pageNumber: 1,
      content: "كتاب رياض الصالحين\n\nمن كلام سيد المرسلين صلى الله عليه وسلم\n\nبسم الله الرحمن الرحيم\n\nالحمد لله الواحد القهار، العزيز الغفار، مكور الليل على النهار، تذكرة لأولي القلوب والأبصار."
    });

    await this.createBookPage({
      bookId: book2.id,
      pageNumber: 2,
      content: "باب الإخلاص وإحضار النية في جميع الأعمال\n\nقال الله تعالى: {وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ}\n\nوعن أمير المؤمنين أبي حفص عمر بن الخطاب رضي الله عنه قال: سمعت رسول الله صلى الله عليه وسلم يقول: إنما الأعمال بالنيات."
    });

    // Mock Quran Verses (Surah Al-Fatiha)
    const fatihaVerses: InsertQuranVerse[] = [
      {
        verseNumber: 1,
        surahNumber: 1,
        surahName: "Al-Fatiha",
        arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        transliteration: "Bismillāhi r-raḥmāni r-raḥīm"
      },
      {
        verseNumber: 2,
        surahNumber: 1,
        surahName: "Al-Fatiha",
        arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "All praise is due to Allah, Lord of the worlds.",
        transliteration: "Al-ḥamdu lillāhi rabbi l-ʿālamīn"
      },
      {
        verseNumber: 3,
        surahNumber: 1,
        surahName: "Al-Fatiha",
        arabicText: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "The Entirely Merciful, the Especially Merciful,",
        transliteration: "Ar-raḥmāni r-raḥīm"
      },
      {
        verseNumber: 4,
        surahNumber: 1,
        surahName: "Al-Fatiha",
        arabicText: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Sovereign of the Day of Recompense.",
        transliteration: "Māliki yawmi d-dīn"
      },
      {
        verseNumber: 5,
        surahNumber: 1,
        surahName: "Al-Fatiha",
        arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "It is You we worship and You we ask for help.",
        transliteration: "Iyyāka naʿbudu wa-iyyāka nastaʿīn"
      },
      {
        verseNumber: 6,
        surahNumber: 1,
        surahName: "Al-Fatiha",
        arabicText: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Guide us to the straight path -",
        transliteration: "Ihdinā ṣ-ṣirāṭa l-mustaqīm"
      },
      {
        verseNumber: 7,
        surahNumber: 1,
        surahName: "Al-Fatiha",
        arabicText: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation: "The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray.",
        transliteration: "Ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn"
      }
    ];

    fatihaVerses.forEach(verse => this.createQuranVerse(verse));

    // Mock Hadiths
    const mockHadiths: InsertHadith[] = [
      {
        hadithNumber: 1,
        book: "Sahih Bukhari",
        chapter: "Revelation",
        arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
        translation: "Actions are but by intentions, and every man shall have only that which he intended.",
        narrator: "Umar ibn Al-Khattab"
      },
      {
        hadithNumber: 2,
        book: "Sahih Bukhari",
        chapter: "Belief",
        arabicText: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        translation: "Whoever believes in Allah and the Last Day should speak good or keep silent.",
        narrator: "Abu Hurairah"
      },
      {
        hadithNumber: 3,
        book: "Sahih Bukhari",
        chapter: "Knowledge",
        arabicText: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        translation: "Seeking knowledge is obligatory upon every Muslim.",
        narrator: "Anas ibn Malik"
      }
    ];

    mockHadiths.forEach(hadith => this.createHadith(hadith));
  }

  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: string): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = randomUUID();
    const book: Book = { 
      ...insertBook, 
      id,
      description: insertBook.description ?? null
    };
    this.books.set(id, book);
    return book;
  }

  async getBookPages(bookId: string): Promise<BookPage[]> {
    return Array.from(this.bookPages.values())
      .filter(page => page.bookId === bookId)
      .sort((a, b) => a.pageNumber - b.pageNumber);
  }

  async getBookPage(id: string): Promise<BookPage | undefined> {
    return this.bookPages.get(id);
  }

  async createBookPage(insertPage: InsertBookPage): Promise<BookPage> {
    const id = randomUUID();
    const page: BookPage = { ...insertPage, id };
    this.bookPages.set(id, page);
    return page;
  }

  async getQuranVerses(surahNumber?: number): Promise<QuranVerse[]> {
    const verses = Array.from(this.quranVerses.values());
    if (surahNumber !== undefined) {
      return verses.filter(v => v.surahNumber === surahNumber);
    }
    return verses.sort((a, b) => {
      if (a.surahNumber !== b.surahNumber) {
        return a.surahNumber - b.surahNumber;
      }
      return a.verseNumber - b.verseNumber;
    });
  }

  async getQuranVerse(id: string): Promise<QuranVerse | undefined> {
    return this.quranVerses.get(id);
  }

  async createQuranVerse(insertVerse: InsertQuranVerse): Promise<QuranVerse> {
    const id = randomUUID();
    const verse: QuranVerse = { 
      ...insertVerse, 
      id,
      transliteration: insertVerse.transliteration ?? null
    };
    this.quranVerses.set(id, verse);
    return verse;
  }

  async getHadiths(book?: string): Promise<Hadith[]> {
    const hadiths = Array.from(this.hadiths.values());
    if (book) {
      return hadiths.filter(h => h.book === book);
    }
    return hadiths.sort((a, b) => a.hadithNumber - b.hadithNumber);
  }

  async getHadith(id: string): Promise<Hadith | undefined> {
    return this.hadiths.get(id);
  }

  async createHadith(insertHadith: InsertHadith): Promise<Hadith> {
    const id = randomUUID();
    const hadith: Hadith = { 
      ...insertHadith, 
      id,
      narrator: insertHadith.narrator ?? null
    };
    this.hadiths.set(id, hadith);
    return hadith;
  }
}

export const storage = new MemStorage();
