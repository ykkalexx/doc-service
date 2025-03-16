import { useState } from "react";

interface Project {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: "planned" | "in-progress" | "completed";
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: crypto.randomUUID(),
      title: newProject.title,
      startDate: new Date(newProject.startDate),
      endDate: new Date(newProject.endDate),
      status: "planned",
    };
    setProjects([...projects, project]);
    setNewProject({ title: "", startDate: "", endDate: "" });
  };

  const calculateTimelineWidth = (start: Date, end: Date) => {
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    return `${Math.max(totalDays * 2, 100)}px`; // 2px per day, minimum 100px
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Project Timeline</h1>

      {/* Project Creation Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Project Title
            </label>
            <input
              type="text"
              required
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Start Date</label>
            <input
              type="date"
              required
              value={newProject.startDate}
              onChange={(e) =>
                setNewProject({ ...newProject, startDate: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">End Date</label>
            <input
              type="date"
              required
              value={newProject.endDate}
              onChange={(e) =>
                setNewProject({ ...newProject, endDate: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Create Project
        </button>
      </form>

      {/* Timeline View */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <span className="px-2 py-1 text-xs text-white bg-blue-500 rounded-full">
                {project.status}
              </span>
            </div>
            <div className="relative h-8 mb-2 overflow-hidden bg-gray-200 rounded-lg">
              <div
                className="absolute h-full bg-blue-500 rounded-lg opacity-25"
                style={{
                  width: calculateTimelineWidth(
                    project.startDate,
                    project.endDate
                  ),
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{project.startDate.toLocaleDateString()}</span>
              <span>{project.endDate.toLocaleDateString()}</span>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 border border-dashed rounded-xl border-gray-300/50">
            <p className="mb-2">No projects created yet</p>
            <p className="text-sm">
              Create your first project to see the timeline
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
