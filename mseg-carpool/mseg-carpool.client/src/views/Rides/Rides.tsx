import { useState, useEffect } from 'react';
import Page from "../../components/Page";
import RideRow from "../../components/RidesComp/RideRow";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import { Cross2Icon } from '@radix-ui/react-icons';
import 'react-calendar/dist/Calendar.css';
import PointsDisplay from '../../components/RidesComp/PointsDisplay';
import * as Dialog from '@radix-ui/react-dialog';
import './Rides.css';
import '../../components/RidesComp/Styles.css';
import apiService from '../Rides/apiService'; // Import the apiService
import '../../components/RidesComp/RideRow.css'; // Ensure this is imported as needed

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
interface PickupPoint {
    pickupPointLat: string;
    pickupPointLong: string;
}

interface Ride {
    id: number;
    origin: string;
    destination: string;
    availableSeats: number;
    mainSeats: number;
    departureTime: string;
    coordinatesLong: string;
    coordinatesLat: string;
    pickupPoints: PickupPoint[]; // Updated to handle multiple pickup points
    status: string;
    rideDriver: RideDriver;
    riders: Array<{
        azureID: string;
        name: string;
        email: string;
        mobileNumber: string;
        location: string;
    }>;
    own: boolean; // New property to indicate ownership
}

const Rides: React.FC = () => {
    const navigate = useNavigate();
    const [rides, setRides] = useState<Ride[]>([]);
    const [currentPage] = useState(1);
    const ridesPerPage = 10;
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [value, onChange] = useState<Value>(new Date());
    const [points, setPoints] = useState<number | null>(null); // State to store points
    const [error, setError] = useState<string | null>(null); // State to store errors
    const [loading, setLoading] = useState(true); // State to store loading status

    useEffect(() => {
        const userId: string = 'user1'; // Replace with the actual user ID
        const azureId: string = 'user1'; // Replace with the actual Azure ID

        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching data
            const currentTime = new Date().toISOString(); // Get the current time in ISO 8601 format
            try {
                const [userRidesResponse, azureRidesResponse, userPointsResponse] = await Promise.allSettled([
                    apiService.getRidesByUserId(userId),
                    apiService.getRideByAzureId(azureId, currentTime),
                    apiService.getUserPoints(azureId) // Fetch user points
                ]);

                const extractRides = (response: any) => {
                    if (response && Array.isArray(response.$values)) {
                        return response.$values;
                    } else if (Array.isArray(response)) {
                        return response;
                    } else {
                        console.error('Unexpected data format:', response);
                        return [];
                    }
                };

                const userRides = userRidesResponse.status === 'fulfilled' ? extractRides(userRidesResponse.value.data) : [];
                const azureRides = azureRidesResponse.status === 'fulfilled' ? extractRides(azureRidesResponse.value.data) : [];

                if (userRides.length === 0 && azureRides.length === 0) {
                    setRides([]);
                } else {
                    const transformedUserRides = userRides.map((ride: any) => ({
                        id: ride.id,
                        origin: ride.origin,
                        destination: ride.destination,
                        availableSeats: ride.availableSeats,
                        mainSeats: ride.mainSeats,
                        departureTime: ride.departureTime,
                        coordinatesLong: ride.coordinatesLong,
                        coordinatesLat: ride.coordinatesLat,
                        pickupPoints: ride.requests?.$values?.[0]?.pickupPoints?.$values?.map((point: any) => ({
                            pickupPointLong: point.pickupPointLong || 'N/A',
                            pickupPointLat: point.pickupPointLat || 'N/A'
                        })) || [],
                        status: ride.requests?.$values?.[0]?.status || 'N/A',
                        rideDriver: {
                            azureID: ride.user?.id || '',
                            name: ride.user?.name || 'N/A',
                            email: ride.user?.email || 'N/A',
                            mobileNumber: ride.user?.mobileNumber || 'N/A',
                            location: ride.user?.location || 'N/A',
                            driverCar: ride.user?.carType || 'N/A',
                            driverCarPlate: ride.user?.carPlate || 'N/A',
                            driverCarColor: ride.user?.carColor || 'N/A',
                        },
                        riders: [], // Add logic to populate if needed
                        own: false // Set own to false for rides fetched by user ID
                    }));
                    const transformedAzureRides = azureRides.map((ride: any) => ({
                        id: ride.id,
                        origin: ride.origin,
                        destination: ride.destination,
                        availableSeats: ride.availableSeats,
                        mainSeats: ride.mainSeats,
                        departureTime: ride.departureTime,
                        coordinatesLong: ride.coordinatesLong,
                        coordinatesLat: ride.coordinatesLat,
                        pickupPoints: ride.pickupPoints?.$values?.map((point: any) => ({
                            pickupPointLong: point.pickupPointLong || 'N/A',
                            pickupPointLat: point.pickupPointLat || 'N/A'
                        })) || [],
                        status: ride.status || 'N/A',
                        rideDriver: {
                            azureID: '', // Since azureID is not available in the JSON, set it to an empty string
                            name: ride.driverName || 'N/A', // Directly use driverName from the ride object
                            email: 'N/A', // If email is not available, set it to 'N/A'
                            mobileNumber: 'N/A', // If mobileNumber is not available, set it to 'N/A'
                            location: 'N/A', // If location is not available, set it to 'N/A'
                            driverCar: 'N/A', // If carType is not available, set it to 'N/A'
                            driverCarPlate: 'N/A', // If carPlate is not available, set it to 'N/A'
                            driverCarColor: 'N/A' // If carColor is not available, set it to 'N/A'
                        },
                        riders: [], // Add logic to populate if needed
                        own: true // Set own to true for rides fetched by Azure ID
                    }));

                    setRides([...transformedUserRides, ...transformedAzureRides]);
                }

                // Handle user points response
                if (userPointsResponse.status === 'fulfilled') {
                    const pointsData = userPointsResponse.value.data;
                    setPoints(pointsData.points);
                } else {
                    setError('Error fetching user points.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setRides([]);
                setError('Error fetching data.');
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchData();
    }, []);


    const handleDelete = (id: number) => {
        apiService.deleteRide(id)
            .then(() => {
                setRides(rides.filter(ride => ride.id !== id));
            })
            .catch(error => console.error('Error deleting ride:', error));
    };

    const handleCreateRide = () => {
        navigate('/CreateRide');
    };

    const indexOfLastRide = currentPage * ridesPerPage;
    const indexOfFirstRide = indexOfLastRide - ridesPerPage;
    const currentRides = rides.slice(indexOfFirstRide, indexOfLastRide);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const tileClassName = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            const rideDates = rides.map(ride => formatDate(ride.departureTime));
            if (rideDates.includes(dateString)) {
                return 'highlight';
            }
        }
        return '';
    };

    return (
        <Page>
            <Dialog.Root>
                <div className="header-container">
                    <div>
                        <button className="button-search" onClick={handleCreateRide}>+ Create New Ride</button>
                        <Dialog.Trigger asChild>
                            <button className="button-search">Calendar</button>
                        </Dialog.Trigger>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {points !== null ? (
                        <PointsDisplay points={points} />
                    ) : (
                        <div>Loading points...</div>
                    )}
                </div>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'center' }}>
                            <div className="calendar-container">
                                <Calendar onChange={onChange} showWeekNumbers value={value} tileClassName={tileClassName} />
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button className="IconButton" aria-label="Close">
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            <div className="container-ride">
                {loading ? (
                    <div className="loading-message">
                        <p>Loading rides...</p>
                    </div>
                ) : rides.length === 0 ? (
                    <div className="no-rides-message">
                        <p>No rides found. Create one or request one.</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Driver</th>
                                    <th>From</th>
                                    <th>Destination</th>
                                    <th>Pickup Time</th>
                                    <th>Seats Left</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRides.map(ride => (
                                    <RideRow
                                        key={ride.id}
                                        id={ride.id}
                                        name={ride.rideDriver?.name || 'N/A'}
                                        origin={ride.origin}
                                        destination={ride.destination}
                                        departureTime={ride.departureTime}
                                        availableSeats={ride.availableSeats}
                                        coordinatesLat={ride.coordinatesLat}
                                        coordinatesLong={ride.coordinatesLong}
                                        pickupPoints={ride.pickupPoints}
                                        mainSeats={ride.mainSeats}
                                        status={ride.status || 'N/A'}
                                        azureID="user1"
                                        email={ride.rideDriver?.email || 'N/A'}
                                        mobileNumber={ride.rideDriver?.mobileNumber || 'N/A'}
                                        location={ride.rideDriver?.location || 'N/A'}
                                        driverCar={ride.rideDriver?.driverCar || 'N/A'}
                                        driverCarPlate={ride.rideDriver?.driverCarPlate || 'N/A'}
                                        driverCarColor={ride.rideDriver?.driverCarColor || 'N/A'}
                                        onDelete={handleDelete}
                                        own={ride.own} // Pass the new own property
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Page>
    );
};

export default Rides;
