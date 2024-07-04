import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Rides from "./views/Rides";
import Dashboard from "./views/Dashboard";

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
                element: <Navigate to="/" replace />,
            }
        ],
    }
]);

export default router;
