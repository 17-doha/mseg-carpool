import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import './RideRow.css';

interface RideRowProps {
    id: number;
    driver: string;
    from: string;
    destination: string;
    pickuptime: string;
    count: number;
    status: string;
    own: boolean;
    onDelete: (id: number) => void;
}

const RideRow: React.FC<RideRowProps> = ({
    id,
    driver,
    from,
    destination,
    pickuptime,
    count,
    status,
    own,
    onDelete,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDriver, setEditedDriver] = useState(driver);
    const [editedFrom, setEditedFrom] = useState(from);
    const [editedDestination, setEditedDestination] = useState(destination);
    const [editedPickuptime, setEditedPickuptime] = useState(pickuptime);

    const handleEditClick = () => {
        if (isEditing) {
            // Save changes
            // Perform any necessary actions to save the edited data
            // For simplicity, just update the state here
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
                <span className="count">{count}/4</span>
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
                    </>
                ) : (
                    <span className={`status ${status.toLowerCase()}`}>{status}</span>
                )}
            </td>
        </tr>
    );
};

export default RideRow;
