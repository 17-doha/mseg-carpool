import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Rides from "./views/Rides";
import Dashboard from "./views/Dashboard";
import Search from "./views/Search/Search"
import Requests from "./views/Requests/Requests";
import CreateRideForm from "./views/CreateRide/CreateRideForm";
import DriverForm from "./views/Rides/formExtra";

const handleFormSubmit = (data: { driverCar: string; driverCarPlate: string; driverCarColor: string; mobileNumber: string; }) => {
    console.log("Form Data:", data);
};
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
            },
            {
                path: "/formExtra",
                element: <DriverForm onSubmit={handleFormSubmit} />,
            }

        ],
    }
]);

export default router;
