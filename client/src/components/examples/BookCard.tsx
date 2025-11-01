import BookCard from '../BookCard';

export default function BookCardExample() {
  return (
    <div className="bg-background p-4 space-y-3">
      <BookCard
        id="1"
        title="Tafseer Ibn Kathir"
        author="Imam Ibn Kathir"
        category="Tafseer"
        pages={500}
        onClick={() => console.log('Book clicked: Tafseer Ibn Kathir')}
      />
      <BookCard
        id="2"
        title="Sahih Bukhari"
        author="Imam Bukhari"
        category="Hadith"
        pages={800}
        onClick={() => console.log('Book clicked: Sahih Bukhari')}
      />
      <BookCard
        id="3"
        title="Al-Umm"
        author="Imam Shafi'i"
        category="Fiqh"
        pages={650}
        onClick={() => console.log('Book clicked: Al-Umm')}
      />
    </div>
  );
}
