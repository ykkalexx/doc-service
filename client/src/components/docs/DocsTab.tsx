import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDocs, deleteDoc, uploadDoc } from "../../redux/docsSlice";
import { Label } from "../Label";

export const DocsTab = () => {
  const dispatch = useAppDispatch();
  const { documents, status } = useAppSelector((state) => state.docs);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDocs());
    }
  }, [dispatch, status]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      await dispatch(
        uploadDoc({
          originalName: file.name,
          fileType: file.type,
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to upload document:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteDoc(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const getDocumentType = (
    fileType: string | undefined
  ): "document" | "image" | "spreadsheet" | "presentation" => {
    if (!fileType) return "document";

    if (fileType.includes("image")) return "image";
    if (
      fileType.includes("spreadsheet") ||
      fileType.includes("excel") ||
      fileType.includes("csv")
    )
      return "spreadsheet";
    if (fileType.includes("presentation") || fileType.includes("powerpoint"))
      return "presentation";
    return "document";
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center p-12">
        <p>Loading documents...</p>
      </div>
    );
  }

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
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border bg-gray-50 rounded-xl border-gray-200/50"
            >
              <div className="flex items-center gap-4">
                <Label
                  type={getDocumentType(doc.fileType)}
                  date={new Date(doc.uploadDate).toLocaleDateString()}
                >
                  {doc.fileType?.split("/")[1]?.toUpperCase() || "DOC"}
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
