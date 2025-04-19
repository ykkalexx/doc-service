import { Request, Response } from "express";
import { db } from "../db/db";
import { randomUUID } from "crypto";

export class ProjectsController {
  async createProject(req: Request, res: Response) {
    try {
      const { title, startDate, endDate, status } = req.body;

      if (!title || !startDate || !endDate || !status) {
        return res.status(400).json({
          error: "Missing required fields",
        });
      }

      const project = {
        id: randomUUID(),
        title,
        startDate,
        endDate,
        status,
      };

      await db.addProject(project);
      res.status(201).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllProjects(_req: Request, res: Response) {
    try {
      const projects = await db.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Project ID is required",
        });
      }

      const project = await db.getProjectById(id);

      if (!project) {
        return res.status(404).json({
          error: "Project not found",
        });
      }

      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, startDate, endDate, status } = req.body;

      if (!id) {
        return res.status(400).json({
          error: "Project ID is required",
        });
      }

      const existingProject = await db.getProjectById(id);

      if (!existingProject) {
        return res.status(404).json({
          error: "Project not found",
        });
      }

      const updatedProject = {
        id,
        title,
        startDate,
        endDate,
        status,
      };

      await db.updateProject(updatedProject);

      // Get the updated project from DB
      const project = await db.getProjectById(id);
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Project ID is required",
        });
      }

      await db.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
