import React, { useState, useEffect } from 'react';
import './CreateRideForm.css';

const CreateRideForm = () => {
  const [rideType, setRideType] = useState('toOffice');
  const [pickUpPoint, setPickUpPoint] = useState('');
  const [office, setOffice] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [seats, setSeats] = useState('');

  useEffect(() => {
    const savedRideType = localStorage.getItem('rideType');
    const savedPickUpPoint = localStorage.getItem('pickUpPoint');
    const savedOffice = localStorage.getItem('office');
    const savedDateTime = localStorage.getItem('dateTime');
    const savedSeats = localStorage.getItem('seats');

    if (savedRideType) setRideType(savedRideType);
    if (savedPickUpPoint) setPickUpPoint(savedPickUpPoint);
    if (savedOffice) setOffice(savedOffice);
    if (savedDateTime) setDateTime(savedDateTime);
    if (savedSeats) setSeats(savedSeats);
  }, []);

  const handleRideTypeChange = (event) => {
    setRideType(event.target.value);
  };

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
      rideType,
      pickUpPoint,
      office,
      dateTime,
      seats
    };
    console.log(formData);
    localStorage.setItem('rideType', rideType);
    localStorage.setItem('pickUpPoint', pickUpPoint);
    localStorage.setItem('office', office);
    localStorage.setItem('dateTime', dateTime);
    localStorage.setItem('seats', seats);
    // Add your form submission logic here
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Create New Ride</h1>
        <div className="profile">
          <span>Commute Commanders</span>
          <div className="profile-icon">CC</div>
        </div>
      </header>
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
  );
};

export default CreateRideForm;
