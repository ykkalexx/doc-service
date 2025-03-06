import { Request, Response } from "express";
import { db } from "../db/db";
import { randomUUID } from "crypto";

export class DocsControllers {
  async uploadDocs(req: Request, res: Response) {
    try {
      const { originalName, fileType } = req.body;

      if (!originalName || !fileType) {
        return res.status(400).json({
          error: "Missing required fields",
        });
      }

      const document = {
        id: randomUUID(),
        name: `${Date.now()}-${originalName}`,
        originalName,
        fileType,
        uploadDate: new Date().toISOString(),
      };

      await db.addDocument(document);
      res.status(201).json(document);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async fetchDocs(_req: Request, res: Response) {
    try {
      const documents = await db.getAllDocuments();
      res.json(documents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteDocById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Document ID is required",
        });
      }

      await db.deleteDocument(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
