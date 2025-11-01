import { type Book, type InsertBook, type Chapter, type InsertChapter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getBooks(): Promise<Book[]>;
  getBook(id: string): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  getChapters(bookId: string): Promise<Chapter[]>;
  getChapter(id: string): Promise<Chapter | undefined>;
  createChapter(chapter: InsertChapter): Promise<Chapter>;
}

export class MemStorage implements IStorage {
  private books: Map<string, Book>;
  private chapters: Map<string, Chapter>;

  constructor() {
    this.books = new Map();
    this.chapters = new Map();
  }

  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: string): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = randomUUID();
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }

  async getChapters(bookId: string): Promise<Chapter[]> {
    return Array.from(this.chapters.values())
      .filter(chapter => chapter.bookId === bookId)
      .sort((a, b) => a.order - b.order);
  }

  async getChapter(id: string): Promise<Chapter | undefined> {
    return this.chapters.get(id);
  }

  async createChapter(insertChapter: InsertChapter): Promise<Chapter> {
    const id = randomUUID();
    const chapter: Chapter = { ...insertChapter, id };
    this.chapters.set(id, chapter);
    return chapter;
  }
}

export const storage = new MemStorage();
