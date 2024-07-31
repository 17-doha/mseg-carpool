import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Rides from "./views/Rides";
import Dashboard from "./views/Dashboard";
import Search from "./views/Search/Search"
import Requests from "./views/Requests/Requests";
import CreateRideForm from "./views/CreateRide/CreateRideForm";

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
                path: "/requests",
                element: <Requests />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/search",
                element: <Search />,
            },

            {
                path: "*",
                element: <Navigate to="/" replace />,
            },
            {
                path: "/CreateRide",
                element: <CreateRideForm />,
            }

        ],
    }
]);

export default router;
