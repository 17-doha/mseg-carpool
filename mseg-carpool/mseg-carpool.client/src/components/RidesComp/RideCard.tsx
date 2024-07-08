
import React, { useState, useEffect } from 'react';

interface Ride {
    id: number;
    driver: string;
    from: string;
    destination: string;
    pickuptime: string;
    count: number;
    status: string;
} 
// RideCard component
const RideCard = ({ ride }: { ride: Ride }) => {
    const [dropoffLocation, setDropoffLocation] = useState('');
  
    const handleSaveButton = () => {
      alert(`Dropoff Location for ride ${ride.id}: ${dropoffLocation}`);
      setDropoffLocation('');
      //todo get user info
      //send request to server
      //update ride status
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
            <button type="button" onClick={handleSaveButton}>Request</button>
          </form>
        </div>
      </div>
    );
  };
  
export default RideCard;
