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
      const documentsSql = `
        CREATE TABLE IF NOT EXISTS documents (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          original_name TEXT NOT NULL,
          file_type TEXT NOT NULL,
          upload_date TEXT NOT NULL
        )
      `;

      const projectsSql = `
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          start_date TEXT NOT NULL,
          end_date TEXT NOT NULL,
          status TEXT NOT NULL
        )
      `;

      this.db.run(documentsSql, (err) => {
        if (err) {
          reject(err);
        } else {
          this.db.run(projectsSql, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
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

  async getAllProjects(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM projects", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getProjectById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM projects WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async addProject(project: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO projects (id, title, start_date, end_date, status)
         VALUES (?, ?, ?, ?, ?)`,
        [
          project.id,
          project.title,
          project.startDate,
          project.endDate,
          project.status,
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

  async updateProject(project: {
    id: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      const updates: string[] = [];
      const values: any[] = [];

      if (project.title) {
        updates.push("title = ?");
        values.push(project.title);
      }
      if (project.startDate) {
        updates.push("start_date = ?");
        values.push(project.startDate);
      }
      if (project.endDate) {
        updates.push("end_date = ?");
        values.push(project.endDate);
      }
      if (project.status) {
        updates.push("status = ?");
        values.push(project.status);
      }

      if (updates.length === 0) {
        resolve();
        return;
      }

      values.push(project.id);

      this.db.run(
        `UPDATE projects SET ${updates.join(", ")} WHERE id = ?`,
        values,
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

  async deleteProject(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM projects WHERE id = ?", [id], (err) => {
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
