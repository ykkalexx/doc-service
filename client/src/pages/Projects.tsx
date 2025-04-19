import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchProjects,
  createProject as createProjectAction,
  updateProject as updateProjectAction,
  deleteProject as deleteProjectAction,
  Project,
} from "../redux/projectsSlice";

export default function Projects() {
  const dispatch = useAppDispatch();
  const { projects, status } = useAppSelector((state) => state.projects);
  const [newProject, setNewProject] = useState({
    title: "",
    startDate: "",
    endDate: "",
    status: "planned" as const,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProjectAction(newProject));
    setNewProject({ title: "", startDate: "", endDate: "", status: "planned" });
  };

  const handleStatusChange = (id: string, newStatus: Project["status"]) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      dispatch(updateProjectAction({ ...project, status: newStatus }));
    }
  };

  const handleDeleteProject = (id: string) => {
    dispatch(deleteProjectAction(id));
  };

  const calculateTimelineWidth = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const totalDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    return `${Math.max(totalDays * 2, 100)}px`;
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
        {status === "loading" && (
          <div className="flex items-center justify-center p-12">
            <div className="w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <span className="ml-2">Loading projects...</span>
          </div>
        )}

        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <div className="flex items-center space-x-2">
                <select
                  value={project.status}
                  onChange={(e) =>
                    handleStatusChange(
                      project.id,
                      e.target.value as Project["status"]
                    )
                  }
                  className="px-2 py-1 text-xs text-white bg-blue-500 rounded-full"
                >
                  <option value="planned">planned</option>
                  <option value="in-progress">in-progress</option>
                  <option value="completed">completed</option>
                </select>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-1 text-xs text-white bg-red-500 rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
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
              <span>{new Date(project.startDate).toLocaleDateString()}</span>
              <span>{new Date(project.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        ))}

        {status === "succeeded" && projects.length === 0 && (
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
