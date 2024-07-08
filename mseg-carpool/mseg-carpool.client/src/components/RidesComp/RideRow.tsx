import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEdit, faTrashAlt, faSave, faMapMarkerAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './RideRow.css';

interface RideRowProps {
    id: number;
    driver: string;
    from: string;
    destination: string;
    pickuptime: string;
    ridesLeft: string;
    status: string;
    own: boolean;
    email: string;
    mobileNumber: string;
    location: string;
    driverCar: string;
    driverCarPlate: string;
    driverCarColor: string;
    onDelete: (id: number) => void;
}

const RideRow: React.FC<RideRowProps> = ({
    id,
    driver,
    from,
    destination,
    pickuptime,
    ridesLeft,
    status,
    own,
    email,
    mobileNumber,
    location,
    driverCar,
    driverCarPlate,
    driverCarColor,
    onDelete,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [editedDriver, setEditedDriver] = useState(driver);
    const [editedFrom, setEditedFrom] = useState(from);
    const [editedDestination, setEditedDestination] = useState(destination);
    const [editedPickuptime, setEditedPickuptime] = useState(pickuptime);

    const handleEditClick = () => {
        if (isEditing) {
            setDriver(editedDriver);
            setFrom(editedFrom);
            setDestination(editedDestination);
            setPickuptime(editedPickuptime);
        }
        setIsEditing(!isEditing);
    };

    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete the ride for ${driver}?`)) {
            onDelete(id);
        }
    };

    const handleMapClick = () => {
        const url = `https://www.google.com/maps/dir/${encodeURIComponent(from)}/${encodeURIComponent(destination)}`;
        window.open(url, '_blank');
    };

    const handleInfoClick = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    const setDriver = (value: string) => {
        setEditedDriver(value);
    };

    const setFrom = (value: string) => {
        setEditedFrom(value);
    };

    const setDestination = (value: string) => {
        setEditedDestination(value);
    };

    const setPickuptime = (value: string) => {
        setEditedPickuptime(value);
    };

    return (
        <>
            <tr>
                <td>
                    {isEditing ? (
                        <input
                            type="text"
                            className="editing"
                            value={editedDriver}
                            onChange={(e) => setDriver(e.target.value)}
                        />
                    ) : (
                        editedDriver
                    )}
                </td>
                <td>
                    {isEditing ? (
                        <input
                            type="text"
                            className="editing"
                            value={editedFrom}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    ) : (
                        editedFrom
                    )}
                </td>
                <td>
                    {isEditing ? (
                        <input
                            type="text"
                            className="editing"
                            value={editedDestination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    ) : (
                        editedDestination
                    )}
                </td>
                <td>
                    {isEditing ? (
                        <input
                            type="text"
                            className="editing"
                            value={editedPickuptime}
                            onChange={(e) => setPickuptime(e.target.value)}
                        />
                    ) : (
                        editedPickuptime
                    )}
                </td>
                <td>
                    <span className="passenger-icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <span className="count">{ridesLeft}</span>
                </td>
                <td>
                    {own ? (
                        <>
                            {isEditing ? (
                                <button className="save-btn" onClick={handleEditClick}>
                                    <FontAwesomeIcon icon={faSave} /> Save
                                </button>
                            ) : (
                                <button className="edit-btn" onClick={handleEditClick}>
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                            )}
                            <button className="delete-btn" onClick={handleDeleteClick}>
                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                            <button className="map-btn" onClick={handleMapClick}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> Map
                            </button>
                        </>
                    ) : (
                        <span className={`status ${status.toLowerCase()}`}>{status}</span>
                    )}
                    <button className="info-btn" onClick={handleInfoClick}>
                        <FontAwesomeIcon icon={faInfoCircle} /> Info
                    </button>
                </td>
            </tr>
            {isInfoVisible && (
                <tr className="driver-info">
                    <td colSpan={7}>
                        <div className="card">
                            <h3>Driver Information</h3>
                            <p>Email: {email}</p>
                            <p>Mobile Number: {mobileNumber}</p>
                            <p>Location: {location}</p>
                            <p>Car: {driverCar}</p>
                            <p>Car Plate: {driverCarPlate}</p>
                            <p>Car Color: {driverCarColor}</p>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default RideRow;
