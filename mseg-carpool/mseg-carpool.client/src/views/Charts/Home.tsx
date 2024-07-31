import React, { useEffect, useState } from 'react';
import {
    BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill
} from 'react-icons/bs';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import apiService from '../Rides/apiService';
import "../Charts/Home.css";

// Interface to match the API response
interface Counts {
    totalRides: number;
    totalDrivers: number;
    totalRequests: number;
    totalPassengers: number;
}

const formatDateWithoutYear = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
};

const generateDateLabels = () => {
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        labels.push(formatDateWithoutYear(date));
    }
    return labels;
};

const Home = () => {
    const [counts, setCounts] = useState<Counts>({
        totalRides: 0,
        totalDrivers: 0,
        totalRequests: 0,
        totalPassengers: 0
    });

    const [data, setData] = useState(() => {
        const labels = generateDateLabels();
        return labels.map((label, index) => ({
            name: label,
            Driver: Math.floor(Math.random() * 10000),  // Replace with actual data
            Passenger: Math.floor(Math.random() * 10000),  // Replace with actual data
            amt: Math.floor(Math.random() * 10000),  // Replace with actual data
        }));
    });

    //useEffect(() => {
    //    // Fetch counts from the API
    //    apiService.getCounts()
    //        .then(response => {
    //            const data = response.data;
    //            setCounts({
    //                totalRides: data.totalRides,
    //                totalDrivers: data.totalDrivers,
    //                totalRequests: data.totalRequests,
    //                totalPassengers: data.totalPassengers
    //            });
    //            console.log(data.TotalRides);
    //        })
    //        .catch(error => {
    //            console.error("Error fetching counts:", error);
    //        });
    //}, []);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>RIDES</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>{counts.totalRides}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>DRIVERS</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1>{counts.totalDrivers}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>PASSENGERS</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>{counts.totalPassengers}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>REQUESTS</h3>
                        <BsFillBellFill className='card_icon' />
                    </div>
                    <h1>{counts.totalRequests}</h1>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Passenger" fill="#8884d8" />
                        <Bar dataKey="Driver" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Passenger" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Driver" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;
