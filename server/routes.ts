import type { Express } from "express";
import { storage } from "./storage";

export function registerRoutes(app: Express) {
  // Quran Verses API
  app.get("/api/quran/verses", async (req, res) => {
    try {
      const surahNumber = req.query.surah ? parseInt(req.query.surah as string) : undefined;
      const verses = await storage.getQuranVerses(surahNumber);
      res.json(verses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch verses" });
    }
  });

  app.get("/api/quran/verses/:id", async (req, res) => {
    try {
      const verse = await storage.getQuranVerse(req.params.id);
      if (!verse) {
        return res.status(404).json({ error: "Verse not found" });
      }
      res.json(verse);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch verse" });
    }
  });

  // Hadiths API
  app.get("/api/hadiths", async (req, res) => {
    try {
      const book = req.query.book as string | undefined;
      const hadiths = await storage.getHadiths(book);
      res.json(hadiths);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hadiths" });
    }
  });

  app.get("/api/hadiths/:id", async (req, res) => {
    try {
      const hadith = await storage.getHadith(req.params.id);
      if (!hadith) {
        return res.status(404).json({ error: "Hadith not found" });
      }
      res.json(hadith);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hadith" });
    }
  });

  // Books API
  app.get("/api/books", async (req, res) => {
    try {
      const books = await storage.getBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  });

  app.get("/api/books/:id", async (req, res) => {
    try {
      const book = await storage.getBook(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book" });
    }
  });

  app.get("/api/books/:id/pages", async (req, res) => {
    try {
      const pages = await storage.getBookPages(req.params.id);
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book pages" });
    }
  });
}
