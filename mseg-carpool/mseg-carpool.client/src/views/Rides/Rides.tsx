import { useState, useEffect } from 'react';
import Page from "../../components/Page";
import RideRow from "../../components/RidesComp/RideRow";
import Pagination from "../../components/RidesComp/Pagination";
import { useNavigate } from "react-router-dom";
import './Rides.css';
import '../../components/RidesComp/RideRow.css';
import RideData from './datatry.json';
import Calendar from '../../components/RidesComp/Calender'; // Adjust the path as per your actual component location

interface RideDriver {
    azureID: string;
    name: string;
    email: string;
    mobileNumber: string;
    location: string;
    driverCar: string;
    driverCarPlate: string;
    driverCarColor: string;
}

interface Ride {
    id: number;
    origin: string;
    destination: string;
    availableSeats: number;
    rideDriver: RideDriver;
    departureTime: string;
    own: string;
    status: string;
    riders: Array<{
        azureID: string;
        name: string;
        email: string;
        mobileNumber: string;
        location: string;
    }>;
}

const Rides = () => {
    const navigate = useNavigate();
    const [rides, setRides] = useState<Ride[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ridesPerPage = 10;
    const [hasClickedCreateRide, setHasClickedCreateRide] = useState(false);

    useEffect(() => {
        setRides(RideData);
        const savedHasClickedCreateRide = localStorage.getItem('hasClickedCreateRide');
        if (savedHasClickedCreateRide) {
            setHasClickedCreateRide(JSON.parse(savedHasClickedCreateRide));
        }
    }, []);

    const handleDelete = (id: number) => {
        setRides(rides.filter(ride => ride.id !== id));
    };

    const handleCreateRide = () => {
        const driverFormData = localStorage.getItem('driverFormData');
        if (driverFormData) {
            // Navigate to CreateRideForm if data exists
            navigate('/CreateRide');
        } else {
            navigate('/formExtra');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastRide = currentPage * ridesPerPage;
    const indexOfFirstRide = indexOfLastRide - ridesPerPage;
    const currentRides = rides.slice(indexOfFirstRide, indexOfLastRide);

    return (
        <Page>
            <div className="container">
                <button className="button" onClick={handleCreateRide}>+ Create New Ride</button>
            </div>

            <div className="rides-calendar-container">
                <div className="rides-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Driver</th>
                                <th>From</th>
                                <th>Destination</th>
                                <th>Pickup Time</th>
                                <th>Rides Left</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRides.map(ride => (
                                <RideRow
                                    key={ride.id}
                                    id={ride.id}
                                    name={ride.rideDriver.name}
                                    origin={ride.origin}
                                    destination={ride.destination}
                                    departureTime={ride.departureTime}
                                    availableSeats={ride.availableSeats}
                                    status={ride.status}
                                    azureID={ride.rideDriver.azureID}
                                    email={ride.rideDriver.email}
                                    mobileNumber={ride.rideDriver.mobileNumber}
                                    location={ride.rideDriver.location}
                                    driverCar={ride.rideDriver.driverCar}
                                    driverCarPlate={ride.rideDriver.driverCarPlate}
                                    driverCarColor={ride.rideDriver.driverCarColor}
                                    onDelete={handleDelete}
                                    own={ride.own}
                                />
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(rides.length / ridesPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>

                <div className="calendar-container">
                    <Calendar rides={rides} />
                </div>
            </div>
        </Page>
    );
};

export default Rides;
