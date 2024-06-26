import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Contact from "./pages/contact";
import Details from "./pages/details";
import Update from "./pages/update";
import Add from "./pages/add";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
        {
          path: "/update/:id",
          element: <Update />,
        },
        {
          path: "/add",
          element: <Add />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
