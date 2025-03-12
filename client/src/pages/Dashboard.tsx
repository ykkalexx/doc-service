import { DocsTab } from "../components/docs/DocsTab";

export function Dashboard() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Documents Dashboard</h1>
      <DocsTab />
    </div>
  );
}
