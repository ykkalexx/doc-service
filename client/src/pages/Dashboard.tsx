import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchDocs, deleteDoc } from "../redux/docsSlice";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const { documents, status, error } = useAppSelector((state) => state.docs);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDocs());
    }
  }, [dispatch, status]);

  const handleDelete = (id: string) => {
    dispatch(deleteDoc(id));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Documents Dashboard</h1>

      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 border rounded-md">
              <h2 className="font-semibold">{doc.originalName}</h2>
              <p className="text-sm text-gray-600">Type: {doc.fileType}</p>
              <p className="text-sm text-gray-600">
                Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
              </p>
              <button
                className="px-3 py-1 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => handleDelete(doc.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
