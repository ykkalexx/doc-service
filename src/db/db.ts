import sqlite3 from "sqlite3";
import { Database } from "sqlite3";

export class DB {
  private db: Database;

  constructor() {
    this.db = new sqlite3.Database("documents.db", (err) => {
      if (err) {
        console.error("Could not connect to database", err);
      } else {
        console.log("Connected to database");
      }
    });
    this.init().catch(console.error);
  }

  public async init() {
    await this.createTables();
  }

  private createTables(): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS documents (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          original_name TEXT NOT NULL,
          file_type TEXT NOT NULL,
          upload_date TEXT NOT NULL
        )
      `;

      this.db.run(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getAllDocuments(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM documents", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async addDocument(document: {
    id: string;
    name: string;
    originalName: string;
    fileType: string;
    uploadDate: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO documents (id, name, original_name, file_type, upload_date)
         VALUES (?, ?, ?, ?, ?)`,
        [
          document.id,
          document.name,
          document.originalName,
          document.fileType,
          document.uploadDate,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  async deleteDocument(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM documents WHERE id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export const db = new DB();