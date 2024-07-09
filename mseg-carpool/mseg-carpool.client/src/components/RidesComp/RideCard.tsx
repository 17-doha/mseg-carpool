import React, { useState, useEffect } from 'react';
import { useRequestContext } from '../../context/RequestContext';

interface Ride {
    id: number;
    driver: string;
    from: string;
    destination: string;
    pickuptime: string;
    count: number;
    status: string;
}

const RideCard = ({ ride }: { ride: Ride }) => {
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [requested, setRequested] = useState(false);
    const { state, dispatch } = useRequestContext();

    useEffect(() => {
        // Check if the ride has already been requested
        const existingRequest = state.requests.find(req => req.id === ride.id);
        if (existingRequest) {
            setRequested(true);
        } else {
            setRequested(false);
        }
    }, [state.requests, ride.id]);

    const handleSaveButton = () => {
        const requestMessage = `Ride from ${ride.from} to ${ride.destination} at ${ride.pickuptime}, you have 1 seat available.`;
        dispatch({
            type: 'ADD_REQUEST',
            payload: { id: ride.id, from: ride.driver, message: requestMessage },
        });
        setRequested(true);
        alert(`Dropoff Location for ride ${ride.id}: ${dropoffLocation}`);
        setDropoffLocation('');
    };

    return (
        <div className="ride-card">
            <div className="ride-info">
                <div><strong>Date:</strong> {ride.pickuptime}</div>
                <div><strong>Driver:</strong> {ride.driver}</div>
                <div><strong>Origin:</strong> {ride.from}</div>
                <div><strong>Destination:</strong> {ride.destination}</div>
                <div><strong>Available Seats:</strong> {ride.count}</div>
                <form>
                    <input
                        type="text"
                        placeholder="Enter dropoff location..."
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                    />
                    <button type="button" onClick={handleSaveButton} disabled={requested}>
                        {requested ? "Requested" : "Request"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RideCard;
