import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSave, faInfoCircle, faCrown, faEdit, faTrash, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import apiService from '../../views/Rides/apiService'; // Ensure the apiService is imported
import './RideRow.css';

interface PickupPoint {
    pickupPointLat: string;
    pickupPointLong: string;
}

interface RideRowProps {
    id: number;
    azureID: string;
    name: string;
    origin: string;
    destination: string;
    departureTime: string;
    availableSeats: number;
    coordinatesLong: string;
    coordinatesLat: string;
    pickupPoints: PickupPoint[]; // Updated to handle multiple pickup points
    mainSeats: number;
    status: string;
    email: string;
    mobileNumber: string;
    location: string;
    driverCar: string;
    driverCarPlate: string;
    driverCarColor: string;
    onDelete: (id: number) => void;
    own: boolean;
}


const officeLocations = ["Zamalek", "Smart Village", "5th Settlement"];

const RideRow: React.FC<RideRowProps> = ({
    id,
    azureID,
    name,
    origin,
    destination,
    departureTime,
    availableSeats,
    coordinatesLong,
    coordinatesLat,
    pickupPoints,
    mainSeats,
    status,
    email,
    mobileNumber,
    location,
    driverCar,
    driverCarPlate,
    driverCarColor,
    onDelete,
    own
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editedDriver, setEditedDriver] = useState(name);
    const [editedFrom, setEditedFrom] = useState(origin);
    const [editedDestination, setEditedDestination] = useState(destination);
    const [editedPickuptime, setEditedPickuptime] = useState(departureTime);

    const handleEditClick = () => {
        if (isEditing) {
            const updatedRide = {
                origin: editedFrom,
                destination: editedDestination,
                availableSeats,
                departureTime: new Date(editedPickuptime),
            };

            apiService.updateRide(azureID, updatedRide)
                .then(response => {
                    console.log('Ride updated successfully:', response.data);
                    // Optionally, you can refresh the ride data here or set a success message
                })
                .catch(error => {
                    console.error('Error updating ride:', error);
                    // Optionally, handle the error by showing a message to the user
                });
        }
        setIsEditing(!isEditing);
    };
    const handleCancelClick = () => {
        if (window.confirm(`Are you sure you want to cancel the request for the ride of ${name}?`)) {
            apiService.cancelRequest(id, azureID)
                .then(() => {
                    console.log('Request canceled successfully');
                    window.location.reload(); // Reload the entire page
                })
                .catch(error => console.error('Error canceling request:', error));
        }
    };

    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete the ride of ${name}?`)) {
            apiService.deleteRide(id)
                .then(() => {
                    onDelete(id);
                    window.location.reload(); // Reload the entire page
                })
                .catch(error => console.error('Error deleting ride:', error));
        }
    };

    const handleMapClick = () => {
        const baseUrl = 'https://www.google.com/maps/dir/';
        let url = '';

        if (pickupPoints && pickupPoints.length > 0) {
            // Use the first pickup point as the starting point
            const firstPickupPoint = pickupPoints[0];

            // Construct the route URL
            url = `${baseUrl}${encodeURIComponent(origin)}/${firstPickupPoint.pickupPointLat},${firstPickupPoint.pickupPointLong}`;

            // Add intermediate pickup points
            for (let i = 1; i < pickupPoints.length; i++) {
                const point = pickupPoints[i];
                url += `/${point.pickupPointLat},${point.pickupPointLong}`;
            }

            // Add the final destination
            url += `/${encodeURIComponent(destination)}`;
        } else if (officeLocations.includes(origin)) {
            url = `${baseUrl}${encodeURIComponent(origin)}/${coordinatesLat},${coordinatesLong}`;
        } else if (officeLocations.includes(destination)) {
            url = `${baseUrl}${coordinatesLat},${coordinatesLong}/${encodeURIComponent(destination)}`;
        } else {
            url = `${baseUrl}${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`;
        }

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
                        <>
                            {own && (
                                <FontAwesomeIcon icon={faCrown} className="crown-icon" />
                            )}
                            {editedDriver}
                        </>
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
                    <span className="count">{availableSeats + " / " + mainSeats}</span>
                </td>
                <td>
                    {own ? (
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
                            <button className="button-class map-btn" onClick={handleMapClick}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </button>
                            <button className="button-class delete-btn" onClick={handleDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </>
                    ) : (
                        <>
                            <span className={`status ${status.toLowerCase()}`}>{status}</span>
                            <button className="button-class map-btn" onClick={handleMapClick}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                </button>
                                
                            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <Dialog.Trigger asChild>
                                    <button className="button-class info-btn">
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </button>
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="DialogOverlay" />
                                    <Dialog.Content className="DialogContent">
                                        <div className="driver-info-card">
                                            <div className="driver-info-content">
                                                <p>Email: {email}</p>
                                                <p>Mobile Number: {mobileNumber}</p>
                                                <p>Location: {location}</p>
                                                <p>Car: {driverCar}</p>
                                                <p>Car Plate: {driverCarPlate}</p>
                                                <p>Car Color: {driverCarColor}</p>
                                            </div>
                                        </div>
                                        <Dialog.Close asChild>
                                            <button className="IconButton" aria-label="Close">
                                                <Cross2Icon />
                                            </button>
                                        </Dialog.Close>
                                    </Dialog.Content>
                                </Dialog.Portal>
                                </Dialog.Root>
                                <button className="button-class cancel-btn" onClick={handleCancelClick}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                        </>
                    )}
                </td>
            </tr>
        </>
    );
};

export default RideRow;
