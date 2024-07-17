import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEdit, faTrashAlt, faSave, faMapMarkerAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './RideRow.css';

interface RideRowProps {
    id: number;
    azureID: string;
    name: string;
    origin: string;
    destination: string;
    departureTime: string;
    availableSeats: number;
    status: string;
    own: string;
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
    name,
    origin,
    destination,
    departureTime,
    availableSeats,
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editedDriver, setEditedDriver] = useState(name);
    const [editedFrom, setEditedFrom] = useState(origin);
    const [editedDestination, setEditedDestination] = useState(destination);
    const [editedPickuptime, setEditedPickuptime] = useState(departureTime);

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
        if (window.confirm(`Are you sure you want to delete the ride of ${name}?`)) {
            onDelete(id);
        }
    };

    const handleMapClick = () => {
        const url = `https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`;
        window.open(url, '_blank');
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
                    <span className="count">{"0/" + availableSeats}</span>
                </td>
                <td>
                    {own === "1" ? (
                        <>
                            {isEditing ? (
                                <button className="button-class save-btn" onClick={handleEditClick}>
                                    <FontAwesomeIcon icon={faSave} />
                                </button>
                            ) : (
                                <button className="button-class edit-btn" onClick={handleEditClick}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            )}
                            <button className="button-class delete-btn" onClick={handleDeleteClick}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                            <button className="button-class map-btn" onClick={handleMapClick}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </button>
                        </>
                    ) : (
                        <>
                            <span className={`status ${status.toLowerCase()}`}>{status}</span>
                            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <Dialog.Trigger asChild>
                                    <button className="button-class info-btn">
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </button>
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="DialogOverlay" />
                                    <Dialog.Content className="DialogContent">
                                        <Dialog.Title className="DialogTitle">Driver Information</Dialog.Title>
                                        <div className="driver-info-content">
                                            <p>Email: {email}</p>
                                            <p>Mobile Number: {mobileNumber}</p>
                                            <p>Location: {location}</p>
                                            <p>Car: {driverCar}</p>
                                            <p>Car Plate: {driverCarPlate}</p>
                                            <p>Car Color: {driverCarColor}</p>
                                        </div>
                                        <Dialog.Close asChild>
                                            <button className="IconButton" aria-label="Close">
                                                <Cross2Icon />
                                            </button>
                                        </Dialog.Close>
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </>
                    )}
                </td>
            </tr>
        </>
    );
};

export default RideRow;
