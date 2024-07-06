import { useState } from 'react';
import Page from "../../components/Page";
import RideRow from "./RideRow";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import './Rides.css';
import './RideRow.css';

const Rides = () => {
    const navigate = useNavigate();
    const [rides, setRides] = useState([
        { id: 1, driver: 'Ahmed', from: 'October', destination: 'Zamalek', pickuptime: '10:00 AM 2024/07/05', count: 3, status: 'Pending', own: false },
        { id: 3, driver: 'Magdy', from: 'Giza', destination: 'Smart Village', pickuptime: '11:00 AM 2024/07/05', count: 2, status: 'Approved', own: false },
        { id: 2, driver: 'Doha', from: 'Giza', destination: 'Smart Village', pickuptime: '11:00 AM 2024/07/05', count: 2, status: 'Confirmed', own: true },

        // Add more rides as needed for testing pagination
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const ridesPerPage = 3;

    const handleDelete = (id: number) => {
        setRides(rides.filter(ride => ride.id !== id));
    };

    const handleCreateRide = () => {
        navigate('/Dashboard');
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate current rides
    const indexOfLastRide = currentPage * ridesPerPage;
    const indexOfFirstRide = indexOfLastRide - ridesPerPage;
    const currentRides = rides.slice(indexOfFirstRide, indexOfLastRide);

    return (
        <Page>
            <div className="container">
                <button className="button" onClick={handleCreateRide}>+ Create New Ride</button>
            </div>

            <div>
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
                            <RideRow key={ride.id} {...ride} onDelete={handleDelete} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(rides.length / ridesPerPage)}
                    onPageChange={handlePageChange}
                />
            </div>
        </Page>
    );
};

export default Rides;
