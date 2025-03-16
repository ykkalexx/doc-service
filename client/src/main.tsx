import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import { Dashboard } from "./pages/Dashboard";
import Home from "./pages/Home";
import FAQ from "./pages/faq";
import Contact from "./pages/contact";
import NavBar from "./components/Navbar";
import Projects from "./pages/Projects";

// Layout component that includes the NavBar and renders child routes
const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

// Hardcode the base URL for GitHub Pages
const basename = "/doc-service";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "projects",
          element: <Projects />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "faq",
          element: <FAQ />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ],
  {
    basename: basename,
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
