import { useState, useEffect } from 'react';
import Page from "../../components/Page";
import RideRow from "../../components/RidesComp/RideRow";
import Pagination from "../../components/RidesComp/Pagination";
import { useNavigate } from "react-router-dom";
import './Rides.css';
import '../../components/RidesComp/RideRow.css';
import RideData from './datatry.json'; // Assuming datatry.json is in the same directory

const Rides = () => {
    const navigate = useNavigate();
    const [rides, setRides] = useState<Ride[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ridesPerPage = 3;

    useEffect(() => {
        setRides(RideData); // Set rides from imported JSON
        console.log(RideData);
    }, []);

    const handleDelete = (id: number) => {
        setRides(rides.filter(ride => ride.id !== id));
    };

    const handleCreateRide = () => {
        navigate('/CreateRide');
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
