import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './CreateRideForm.css';

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

interface FormData {
    id: number;
    origin: string;
    destination: string;
    availableSeats: number;
    rideDriver: RideDriver;
    departureTime: string;
    status: number;
}

const CreateRideForm: React.FC = () => {
    const [rideType, setRideType] = useState<string>('toOffice');
    const [pickUpPoint, setPickUpPoint] = useState<string>('');
    const [office, setOffice] = useState<string>('');
    const [dateTime, setDateTime] = useState<string>('');
    const [seats, setSeats] = useState<string>('');

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('rideFormData') || '{}');
        if (savedFormData) {
            setRideType(savedFormData.rideType || 'toOffice');
            setPickUpPoint(savedFormData.pickUpPoint || '');
            setOffice(savedFormData.office || '');
            setDateTime(savedFormData.dateTime || '');
            setSeats(savedFormData.seats || '');
        }
    }, []);

    const handleRideTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRideType(event.target.value);
    };

    const handlePickUpPointChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPickUpPoint(event.target.value);
    };

    const handleOfficeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setOffice(event.target.value);
    };

    const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDateTime(event.target.value);
    };

    const handleSeatsChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSeats(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const formData: FormData = {
            id: new Date().getTime(),
            origin: rideType === 'toOffice' ? pickUpPoint : office,
            destination: rideType === 'toOffice' ? office : pickUpPoint,
            availableSeats: parseInt(seats, 10),
            rideDriver: {
                azureID: 'driverAzureID',
                name: 'driverName',
                email: 'driverEmail',
                mobileNumber: 'driverMobileNumber',
                location: 'driverLocation',
                driverCar: 'driverCar',
                driverCarPlate: 'driverCarPlate',
                driverCarColor: 'driverCarColor',
            },
            departureTime: new Date(dateTime).toISOString(),
            status: 0,
        };

        console.log('Form Data:', formData);
    };

    return (
        <div className="container-create">
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value="toOffice"
                                checked={rideType === 'toOffice'}
                                onChange={handleRideTypeChange}
                            />
                            To Office
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="fromOffice"
                                checked={rideType === 'fromOffice'}
                                onChange={handleRideTypeChange}
                            />
                            From Office
                        </label>
                    </div>
                    {rideType === 'toOffice' && (
                        <div className="toOffice-group">
                            <div className="form-group">
                                <label>Pick Up Point</label>
                                <input
                                    type="text"
                                    placeholder="Pick Up Point"
                                    value={pickUpPoint}
                                    onChange={handlePickUpPointChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>To Office</label>
                                <select value={office} onChange={handleOfficeChange}>
                                    <option value="">Select Office</option>
                                    <option value="Smart village office">Smart village office</option>
                                    <option value="Zamalek office">Zamalek office</option>
                                    <option value="5th settlement office">5th settlement office</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {rideType === 'fromOffice' && (
                        <div className="fromOffice-group">
                            <div className="form-group">
                                <label>From Office</label>
                                <select value={office} onChange={handleOfficeChange}>
                                    <option value="">Select Office</option>
                                    <option value="Smart village office">Smart village office</option>
                                    <option value="Zamalek office">Zamalek office</option>
                                    <option value="5th settlement office">5th settlement office</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Drop Off Point</label>
                                <input
                                    type="text"
                                    placeholder="Drop Off Point"
                                    value={pickUpPoint}
                                    onChange={handlePickUpPointChange}
                                />
                            </div>
                        </div>
                    )}
                    <div className="form-group">
                        <label>Pick Date And Time</label>
                        <input
                            type="datetime-local"
                            value={dateTime}
                            onChange={handleDateTimeChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of Available Seats</label>
                        <select value={seats} onChange={handleSeatsChange}>
                            <option value="">Select Seats</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <button className="create-button" type="submit">Create</button>
                </form>
            </div>
            <div className="map-container">
                <div className="map-placeholder">
                    Google Maps Placeholder
                </div>
            </div>
        </div>
    );
};

export default CreateRideForm;
