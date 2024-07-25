import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Page from "../../components/Page";
import "./Search.css";
import RideCard from "../../components/RidesComp/RideCard";
import FilterSidebar from "../../components/Search/FilterSidebar";
import  {Ride, Driver}  from "../../lib/types";
import InfiniteScroll from 'react-infinite-scroll-component';

const Search = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    formattedDate: '',
    origin: '',
    destination: '',
    selectedTime: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await axios.get(`http://localhost:5062/api/Rides?userId=1&pageNumber=${pageNumber}&pageSize=5&minimumSeatsAvailable=1`);
      const newRides = response.data;
      console.log(newRides);
      setRides(prevRides => [...prevRides, ...newRides]);
      setHasMore(newRides.length > 0);
    } catch (error) {
      console.error('Failed to fetch rides:', error);
    }
  };

  const fetchMoreRides = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
    fetchRides();
  };


  const handleFilterChange = (newFilters: { formattedDate: string; origin: string; destination: string; selectedTime: string }) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const filteredRides = rides.filter(ride => {
    return (filters.destination ? ride.destination === filters.destination : true) &&
           (filters.origin ? ride.origin === filters.origin : true) &&
           (filters.formattedDate ? new Date(ride.departureTime).toLocaleDateString() === filters.formattedDate : true) &&
           (filters.selectedTime ? new Date(ride.departureTime).toLocaleTimeString() === filters.selectedTime : true);
  });

  
  const SearchedRides = filteredRides.filter(ride =>
    ride.destination === searchTerm);
  
    
  return (
    <Page>
          <InfiniteScroll
      dataLength={rides.length}
      next={fetchMoreRides}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
      endMessage={<p>No more rides available.</p>}
    >

      <div className="search-and-filter-container">
        <div>
          <input
            type="text"
            placeholder={"Search rides..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size={window.innerWidth < 768 ? 30 : 110}
          />
        </div>
        <FilterSidebar onFilterChange={handleFilterChange}/>
      </div>
      <div className="rides-container">
        {rides.map((ride) => (
          <RideCard key={ride.rideID} ride={ride} />
        ))}
      </div>
    </InfiniteScroll>
    </Page>
  );
};

export default Search;