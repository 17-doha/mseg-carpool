import Page from "../../components/Page";
import React, { useState } from "react";
import "./Search.css";
import RideCard from "../../components/RidesComp/RideCard";

function Search() {
  const [rides, setRides] = useState([
    { id: 1, driver: 'Ahmed', from: 'October', destination: 'Zamalek', pickuptime: '10:00 AM 2024/07/05', count: 3, status: 'Pending'},
    { id: 3, driver: 'Magdy', from: 'Madinaty', destination: 'Smart Village', pickuptime: '11:00 AM 2024/07/05', count: 2, status: 'Approved'},
    { id: 2, driver: 'Doha', from: 'Giza', destination: 'Smart Village', pickuptime: '11:00 AM 2024/07/05', count: 2, status: 'Confirmed'},
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredRides = rides.filter(ride =>
    ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.pickuptime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Page>
      <div>
        <input
          type="text"
          placeholder="Search rides..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="rides-container">
        {filteredRides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </Page>
  );
}

export default Search;
