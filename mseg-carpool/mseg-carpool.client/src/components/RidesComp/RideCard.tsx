import { useState } from 'react';
import { FiCalendar, FiUser, FiMapPin, FiCheckCircle, FiMoreVertical } from 'react-icons/fi';
import ExpandedRide from '../ui/ExpandedRide';
import  {Ride, Driver}  from "../../lib/types";


const RideCard = ({ ride }: { ride: Ride }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const bkColor = (ride.destination === 'Zamalek' || ride.origin === 'Zamalek') ? 'bg-amber-400' : (ride.destination === 'Smart Village' || ride.origin === 'Smart Village') ? 'bg-lime-500' : 'bg-red-500';

    return (
        <div>
            <div>
            </div>
            <div className={"ride-card bg-gray-100 rounded-lg p-2 px-0 pt-0 cursor-pointer " + bkColor} onClick={() => setIsExpanded(true)}>
                
                <div className={"flex items-center justify-between font-mono rounded-t-2xl mb-px p-2 " + bkColor}>
                    <h2 className="text-xl font-bold text-white">Ride #100{ride.rideID}</h2>
                </div>
                <div className=' px-2 pt-1'>
                    <div className="flex items-center mb-1">
                        <FiCalendar className="mr-1" />
                        <span className="text-gray-600">{ride.departureDate}</span>
                    </div>
                    <div className="flex items-center mb-1">
                        <FiUser className="mr-1" />
                        <span className="text-gray-600">{ride.driver.driverName}</span>
                    </div>
                    <div className="flex items-center mb-1">
                        <FiMapPin className="mr-1" />
                        <span className="text-gray-600">{ride.origin}</span>
                    </div>
                    <FiMoreVertical className="text-gray-600" />
                    <div className="flex items-center mb-1">
                        <FiMapPin className="mr-1" color='white' fill='black' />
                        <span className="text-gray-600">{ride.destination}</span>
                    </div>
                    <div className="flex items-center mb-1">
                        <FiCheckCircle className="mr-1" />
                        <span className="text-gray-600">{ride.availableSeats} Available Seats</span>
                    </div>
                </div>
                {isExpanded && <ExpandedRide ride={ride} isOpen={isExpanded} setIsOpen={setIsExpanded} />}
            </div>
        </div>
    );
};

export default RideCard;
