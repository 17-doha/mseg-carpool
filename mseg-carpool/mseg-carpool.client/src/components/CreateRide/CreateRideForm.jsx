import React, { useState, useEffect } from 'react';
import './CreateRideForm.css'
<<<<<<< Updated upstream:mseg-carpool/mseg-carpool.client/src/components/CreateRide/CreateRideForm.jsx
=======
=======
import { useState, useEffect } from 'react';
import './CreateRideForm.css';

>>>>>>> Stashed changes:mseg-carpool/mseg-carpool.client/src/views/CreateRide/CreateRideForm.tsx
const CreateRideForm = () => {
    const [rideType, setRideType] = useState('toOffice');
    const [pickUpPoint, setPickUpPoint] = useState('');
    const [office, setOffice] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [seats, setSeats] = useState('');

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('rideFormData'));
        if (savedFormData) {
            setRideType(savedFormData.rideType);
            setPickUpPoint(savedFormData.pickUpPoint);
            setOffice(savedFormData.office);
            setDateTime(savedFormData.dateTime);
            setSeats(savedFormData.seats);
        }
    }, []);
<<<<<<< Updated upstream:mseg-carpool/mseg-carpool.client/src/components/CreateRide/CreateRideForm.jsx

    const handleRideTypeChange = (event) => {
        setRideType(event.target.value);
    };

=======
    
    const handleRideTypeChange = (event) => {
        setRideType(event.target.value);
    if (savedRideType) setRideType(savedRideType);
    if (savedPickUpPoint) setPickUpPoint(savedPickUpPoint);
    if (savedOffice) setOffice(savedOffice);
    if (savedDateTime) setDateTime(savedDateTime);
    if (savedSeats) setSeats(savedSeats);
  }, []);

  const handleRideTypeChange = (event: any) => {
    setRideType(event.target.value);
  };

  const handlePickUpPointChange = (event: any) => {
    setPickUpPoint(event.target.value);
  };

  const handleOfficeChange = (event: any) => {
    setOffice(event.target.value);
  };

  const handleDateTimeChange = (event: any) => {
    setDateTime(event.target.value);
  };

  const handleSeatsChange = (event: any) => {
    setSeats(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = {
      rideType,
      pickUpPoint,
      office,
      dateTime,
      seats
    };
>>>>>>> Stashed changes:mseg-carpool/mseg-carpool.client/src/views/CreateRide/CreateRideForm.tsx
    const handlePickUpPointChange = (event) => {
        setPickUpPoint(event.target.value);
    };

    const handleOfficeChange = (event) => {
        setOffice(event.target.value);
    };

    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value);
    };

    const handleSeatsChange = (event) => {
        setSeats(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
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
                driverCarColor: 'driverCarColor'
            },
            riders: [
                {
                    azureID: 'riderAzureID',
                    name: 'riderName',
                    email: 'riderEmail',
                    mobileNumber: 'riderMobileNumber',
                    location: 'riderLocation'
                }
            ],
            departureTime: new Date(dateTime).toISOString(),
            status: 0
        };

        // Save form data to local storage
        localStorage.setItem('rideFormData', JSON.stringify(formData));

        console.log('Form Data:', formData);
    };

    return (
        <div className="container">
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
