import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quranVerses = pgTable("quran_verses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  verseNumber: integer("verse_number").notNull(),
  surahNumber: integer("surah_number").notNull(),
  surahName: text("surah_name").notNull(),
  arabicText: text("arabic_text").notNull(),
  translation: text("translation").notNull(),
  transliteration: text("transliteration"),
});

export const hadiths = pgTable("hadiths", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hadithNumber: integer("hadith_number").notNull(),
  book: text("book").notNull(),
  chapter: text("chapter").notNull(),
  arabicText: text("arabic_text").notNull(),
  translation: text("translation").notNull(),
  narrator: text("narrator"),
});

export const books = pgTable("books", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  totalPages: integer("total_pages").notNull(),
  description: text("description"),
  language: text("language").notNull(),
});

export const bookPages = pgTable("book_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookId: varchar("book_id").notNull(),
  pageNumber: integer("page_number").notNull(),
  content: text("content").notNull(),
});

export const insertQuranVerseSchema = createInsertSchema(quranVerses).omit({ id: true });
export const insertHadithSchema = createInsertSchema(hadiths).omit({ id: true });
export const insertBookSchema = createInsertSchema(books).omit({ id: true });
export const insertBookPageSchema = createInsertSchema(bookPages).omit({ id: true });

export type InsertQuranVerse = z.infer<typeof insertQuranVerseSchema>;
export type QuranVerse = typeof quranVerses.$inferSelect;
export type InsertHadith = z.infer<typeof insertHadithSchema>;
export type Hadith = typeof hadiths.$inferSelect;
export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;
export type InsertBookPage = z.infer<typeof insertBookPageSchema>;
export type BookPage = typeof bookPages.$inferSelect;
