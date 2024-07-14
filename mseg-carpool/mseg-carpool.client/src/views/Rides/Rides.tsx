﻿import React, { useState, useEffect } from 'react';
import Page from "../../components/Page";
import RideRow from "../../components/RidesComp/RideRow";
import { useNavigate } from "react-router-dom";
import RideData from './datatry.json';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PointsDisplay from '../../components/RidesComp/PointsDisplay';
import SlidingPanel, { PanelType } from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import './Rides.css';

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
    const [currentPage] = useState(1);
    const ridesPerPage = 10;
    type ValuePiece = Date | null;

    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [points, setPoints] = useState(120);
    useEffect(() => {
        setRides(RideData);
    }, []);

    const handleDelete = (id: number) => {
        setRides(rides.filter(ride => ride.id !== id));
    };

    const handleCreateRide = () => {
        navigate('/CreateRide');
    };

    const [value, onChange] = useState<Value>(new Date());

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

    const [openPanel, setOpenPanel] = useState<boolean>(false);
    const [panelType] = useState<PanelType>('left');
    const [panelSize] = useState<number>(30);

    return (
        <Page>

            <div className="header-container">
                <button className="button-search" onClick={handleCreateRide}>+ Create New Ride</button>
                
                
            </div>
            <button
                type="button"
                onClick={() => setOpenPanel(true)}
                className="button-search"
            >
               Calendar

            </button>
            <PointsDisplay points={points} />

            <SlidingPanel
                type={panelType}
                isOpen={openPanel}
                backdropClicked={() => setOpenPanel(false)}
                size={panelSize}
                panelClassName="additional-class"
                panelContainerClassName=""
            >
                <div className="panel-container">
                    <div className="calendar-container">
                        <Calendar onChange={onChange} showWeekNumbers value={value} tileClassName={tileClassName} />
                    </div>
                    <button type="button" className="button-search" onClick={() => setOpenPanel(false)}>
                        close
                    </button>
                </div>
            </SlidingPanel>

            <div className="container-ride">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Driver</th>
                                <th>From</th>
                                <th>Destination</th>
                                <th>Pickup Time</th>
                                <th>Seats</th>
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
                </div>
                
            </div>
        </Page>
    );
};

export default Rides;
