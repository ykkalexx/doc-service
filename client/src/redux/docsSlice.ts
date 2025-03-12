import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Document } from "../types/types";

interface DocsState {
  documents: Document[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DocsState = {
  documents: [],
  status: "idle",
  error: null,
};

export const fetchDocs = createAsyncThunk("docs/fetchDocs", async () => {
  const response = await fetch("/api/docs");
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }
  return response.json();
});

export const uploadDoc = createAsyncThunk(
  "docs/uploadDoc",
  async (docData: { originalName: string; fileType: string }) => {
    const response = await fetch("/api/docs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(docData),
    });

    if (!response.ok) {
      throw new Error("Failed to upload document");
    }
    return response.json();
  }
);

export const deleteDoc = createAsyncThunk(
  "docs/deleteDoc",
  async (id: string) => {
    const response = await fetch(`/api/docs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete document");
    }
    return id;
  }
);

const docsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDocs.fulfilled,
        (state, action: PayloadAction<Document[]>) => {
          state.status = "succeeded";
          state.documents = action.payload;
        }
      )
      .addCase(fetchDocs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch documents";
      })
      .addCase(
        uploadDoc.fulfilled,
        (state, action: PayloadAction<Document>) => {
          state.documents.push(action.payload);
        }
      )
      .addCase(deleteDoc.fulfilled, (state, action: PayloadAction<string>) => {
        state.documents = state.documents.filter(
          (doc) => doc.id !== action.payload
        );
      });
  },
});

export default docsSlice.reducer;
