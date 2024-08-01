import React, { useState, useEffect } from 'react';
import Page from "../../components/Page";
import "./Search.css";
import RideCard from "../../components/RidesComp/RideCard";
import FilterSidebar from "../../components/Search/FilterSidebar";
import { Ride, Driver } from "../../lib/types";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMsal } from '@azure/msal-react';

interface Filters {
  pageNumber: number;
  filterDate: string;
  origin: string;
  destination: string;
  selectedTime: string;
}

const Search = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    pageNumber: 1,
    filterDate: '',
    origin: '',
    destination: '',
    selectedTime: '',
    //TODO: Add option to filter with available seats
  });
  const [searchTerm, setSearchTerm] = useState('');
  const auth = useMsal();
  const azureID = auth.accounts[0].localAccountId;

  useEffect(() => {
    console.log('Fetching rides... because filtering');
    setRides([]);
    fetchRides(filters);
  }, [filters.destination, filters.origin, filters.filterDate, filters.selectedTime]);

  useEffect(() => {
    console.log('Fetching rides... because page number changed');
    fetchRides(filters);
  }, [filters.pageNumber]);

  function buildQueryParams(params: Filters): string {
    const query = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');
    return query;
  }

  async function fetchRides(filters: Filters) {
    //TODO: Update the URL to match the USERID
    const baseUrl = `http://localhost:5062/api/Rides/?userId=${azureID}&pageSize=8&minimumSeatsAvailable=1`;
    const queryParams = buildQueryParams(filters);
    const url = `${baseUrl}&${queryParams}`;
    console.log('Fetching rides from:', url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const newRides = await response.json();
        console.log(newRides);
        setRides(prevRides => {
          const newUniqueRides = newRides.filter((newRide: Ride) => !prevRides.some(ride => ride.rideID === newRide.rideID));
          return [...prevRides, ...newUniqueRides];
        });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const fetchMoreRides = () => {
    console.log('fetching more rides...');
    setFilters(prevFilters => ({
      ...prevFilters,
      pageNumber: prevFilters.pageNumber + 1,
    }));
  };

  const reloadRides = () => {
    setRides([]);
    fetchRides(filters);
  };

  const handleFilterChange = (newFilters: {
    formattedDate?: string;
    origin?: string;
    destination?: string;
    selectedTime?: string;
}) => {
    setFilters(prevFilters => ({
        ...prevFilters,
        filterDate: newFilters.formattedDate || '',
        origin: newFilters.origin || '',
        destination: newFilters.destination || '',
        selectedTime: newFilters.selectedTime || '',
        pageNumber: 1, // Reset page number when filters change
    }));
};

  const SearchedRides = rides.filter(ride =>
      ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.origin.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ride.driver.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.departureDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.departureTime.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Page>
      <InfiniteScroll
        dataLength={rides.length}
        next={fetchMoreRides}
        hasMore={hasMore}
        loader={<p></p>}
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
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>
        <div className="rides-container">
          {SearchedRides.map((ride) => (
            <RideCard key={ride.rideID} ride={ride} setRequested={reloadRides} />
          ))}
        </div>
      </InfiniteScroll>
    </Page>
  );
};

export default Search;