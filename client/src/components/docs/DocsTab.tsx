import { useState, useEffect } from "react";
import { Label } from "../Label";

interface Document {
  id: string;
  name: string;
  originalName: string;
  fileType: string;
  uploadDate: string;
}

export const DocsTab = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`http://localhost:8004/api/documents`);
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data = await response.json();
      setDocs(data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const document = {
        originalName: file.name,
        fileType: file.type,
      };

      const response = await fetch("http://localhost:8004/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      });

      if (!response.ok) throw new Error("Failed to upload document");

      const uploadedDoc = await response.json();
      setDocs((prev) => [...prev, uploadedDoc]);
    } catch (error) {
      console.error("Failed to upload document:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8004/api/documents/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete document");
      setDocs((prev) => prev.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const getDocumentType = (
    fileType: string
  ): "document" | "image" | "spreadsheet" | "presentation" => {
    if (fileType.includes("image")) return "image";
    if (
      fileType.includes("spreadsheet") ||
      fileType.includes("excel") ||
      fileType.includes("csv")
    )
      return "spreadsheet";
    if (fileType.includes("presentation") || fileType.includes("powerpoint"))
      return "presentation";
    return "document"; // default
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extralight">Document Repository</h2>
        <div className="flex items-center gap-4">
          <label className="px-4 py-2 text-sm font-light text-white transition-colors bg-gray-900 cursor-pointer rounded-xl hover:bg-gray-800">
            Upload Document
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      <div className="grid gap-4">
        {docs.length > 0 ? (
          docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border bg-gray-50 rounded-xl border-gray-200/50"
            >
              <div className="flex items-center gap-4">
                <Label
                  type={getDocumentType(doc.fileType)}
                  date={new Date(doc.uploadDate).toLocaleDateString()}
                >
                  {doc.fileType.split("/")[1]?.toUpperCase() || "DOC"}
                </Label>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {doc.originalName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="px-3 py-1 text-xs text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 border border-dashed rounded-xl border-gray-300/50">
            <p className="mb-2">No documents uploaded yet</p>
            <p className="text-sm">Upload your first document to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
