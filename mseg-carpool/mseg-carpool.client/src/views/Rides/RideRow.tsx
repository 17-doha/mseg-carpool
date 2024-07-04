import React from 'react';
import './RideRow.css';

interface RideRowProps {
    driver: string;
    from: string;
    destination: string;
    pickuptime: string;
    count: number;
    status: string;
}

const RideRow: React.FC<RideRowProps> = ({ driver, from, destination, pickuptime, count, status }) => {
    return (
        <table>
 
            <tbody>
                {driver !== null && (
                    <tr>
                        <td>{driver}</td>
                        <td>{from}</td>
                        <td>{destination}</td>
                        <td>{pickuptime}</td>
                        <td>{count}</td>
                        <td>{status}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default RideRow;
