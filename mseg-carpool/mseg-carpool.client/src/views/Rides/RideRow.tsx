import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './RideRow.css';
import { useNavigate } from "react-router-dom";

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

const RideRow: React.FC<RideRowProps> = ({ id, driver, from, destination, pickuptime, count, status, own, onDelete }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate("/Dashboard");
    };

    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete the ride for ${driver}?`)) {
            onDelete(id); 
        }
    };

    return (
        <tr>
            <td>{driver}</td>
            <td>{from}</td>
            <td>{destination}</td>
            <td>{pickuptime}</td>
            <td>{count}</td>
            <td>
                {own ? (
                    <>
                        <button onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button onClick={handleDeleteClick}>
                            <FontAwesomeIcon icon={faTrashAlt} /> Delete
                        </button>
                    </>
                ) : (
                    status
                )}
            </td>
        </tr>
    );
}

export default RideRow;
