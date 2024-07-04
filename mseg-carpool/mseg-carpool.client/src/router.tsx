import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Rides from "./views/Rides";
import Dashboard from "./views/Dashboard";
import Error404 from "./views/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/rides" replace />,
      },
      {
        path: "/rides",
        element: <Rides />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

export default router;
