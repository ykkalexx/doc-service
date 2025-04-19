import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: "planned" | "in-progress" | "completed";
}

interface ProjectsState {
  projects: Project[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  status: "idle",
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get("http://localhost:8004/api/projects");
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project: Omit<Project, "id">) => {
    const response = await axios.post(
      "http://localhost:8004/api/projects",
      project
    );
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (project: Project) => {
    const response = await axios.put(
      `http://localhost:8004/api/projects/${project.id}`,
      project
    );
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string) => {
    await axios.delete(`http://localhost:8004/api/projects/${id}`);
    return id;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.status = "succeeded";
          state.projects = action.payload;
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch projects";
      })

      // Create Project
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.projects.push(action.payload);
        }
      )

      // Update Project
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          const index = state.projects.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.projects[index] = action.payload;
          }
        }
      )

      // Delete Project
      .addCase(
        deleteProject.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.projects = state.projects.filter(
            (p) => p.id !== action.payload
          );
        }
      );
  },
});

export default projectsSlice.reducer;
