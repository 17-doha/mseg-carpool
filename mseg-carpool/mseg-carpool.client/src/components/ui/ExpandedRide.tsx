import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import {
    Dialog,
    DialogOverlay,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "./dialog";
import MapRequest from "../Search/MapRequest";
import { Ride } from "../../lib/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';

interface RequestCreateDto {
    userId: string;
    rideId: number;
    status: string;
    coordinates: string;
}
const ExpandedRide = ({ ride, isOpen, setIsOpen, setRequested }:
    { 
       ride: Ride; 
       isOpen: boolean;
       setIsOpen: (isOpen: boolean) => void;
       setRequested: () => void 
   }) => {

   const { instance } = useMsal();
   const userAccount = () => instance.getActiveAccount() || instance.getAllAccounts()[0];
   const [formData, setFormData] = useState<RequestCreateDto>({
       userId: userAccount().localAccountId,
       rideId: ride.rideID,
       status: 'Pending',
       coordinates: ','
   });
   const [duration, setDuration] = useState<string | null>(null);

   const handleLocationSelect = (location: { lat: number, lng: number }) => {
       setFormData({
           ...formData,
           coordinates: `${location.lat},${location.lng}`
       });
   };

   const handleDurationChange = (duration: string) => {
       setDuration(duration);
   };

   const handleMapClick = () => {
       const baseUrl = 'https://www.google.com/maps/dir/';
       let url = '';

       const officeLocations: { [key: string]:  string } = {
           'Zamalek': '30.063562, 31.216005',
           '5th Settlement':  '30.010270,  31.407254',
           'Smart Village':  '30.071012,  31.017022'
       };
       const originCords = officeLocations[ride.origin] || ride.coordinates;
       const destinationCords = officeLocations[ride.destination] || ride.coordinates;
       url = `${baseUrl}${originCords}/${destinationCords}`;
       window.open(url, '_blank');
   };

   const handleSubmitRequest = () => {
       fetch('http://localhost:5062/api/Requests', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(formData),
       })
           .then(response => {
               // Handle the response from the server
           })
           .catch(error => {
               // Handle any errors that occurred during the request
           });
       setRequested();
       setIsOpen(false);
   };

   const formattedDate = ride.departureDate.split('T')[0].split('-').reverse().join('-');

   const calculateArrivalTime = (departureTime: string, duration: string | null) => {
       if (!duration) return departureTime;

       const [hours, minutes] = duration.split(' ').reduce((acc, val, idx, arr) => {
           if (val.includes('hour')) acc[0] = parseInt(arr[idx - 1]);
           if (val.includes('min')) acc[1] = parseInt(arr[idx - 1]);
           return acc;
       }, [0, 0]);

       const [depHours, depMinutes] = departureTime.split(':').map(Number);
       const arrivalDate = new Date();
       arrivalDate.setHours(depHours + hours, depMinutes + minutes);

       return arrivalDate.toTimeString().split(' ')[0].substring(0, 5);
   };

   const estimatedArrivalTime = calculateArrivalTime(ride.departureTime, duration);

   return (
       <div>
           <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogOverlay className="fixed inset-0 bg-black opacity-50" />
               <DialogContent
                   onInteractOutside={() => setIsOpen(false)}
                   className="container min-w-2 mx-auto bg-white rounded-lg shadow-lg p-4"
               >
                   <DialogHeader className="flex justify-between items-center mb-4">
                       <DialogTitle className="text-xl font-bold">Ride #{ride.rideID}</DialogTitle>
                       <DialogClose
                           className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                           onClick={() => setIsOpen(false)}                            
                       />
                   </DialogHeader>
                   <div className="flex flex-col md:flex-row">
                       <div className="md:w-1/3 p-4 bg-gray-100 rounded-md shadow-md">
                           <h2 className="text-lg font-semibold mb-2">Ride Details</h2>
                           <p><strong>Origin:</strong> {ride.origin}</p>
                           <p><strong>Destination:</strong> {ride.destination}</p>
                           <button className="button-class map-btn" onClick={handleMapClick}>
                               <FontAwesomeIcon icon={faMapLocation} beatFade />
                           </button>
                           <p><strong>Date:</strong> {formattedDate}</p>
                           <p><strong>Departure Time:</strong> {ride.departureTime}</p>
                           <p><strong>Estimated Arrival Time:</strong> {estimatedArrivalTime}</p>
                           <h2 className="text-lg font-semibold ">Driver Info</h2>
                           <p><strong>Name:</strong> {ride.driver.driverName}</p>
                           <p><strong>Contact:</strong> {ride.driver.driverMobileNo}</p>
                           <h2 className='text-lg font-semibold mt-4 mb-2'>Car Info</h2>
                           <p><strong>Car:</strong> {ride.driver.carType}, {ride.driver.carModel}</p>
                           <p><strong>Plate:</strong> {ride.driver.carPlate}</p>
                           <p><strong>Color:</strong> {ride.driver.carColor}</p>
                       </div>
                       <div className="md:w-2/3 p-4">
                           <MapRequest
                               onLocationSelect={handleLocationSelect}
                               origin={ride.origin}
                               destination={ride.destination}
                               coordinates={ride.coordinates}
                               onDurationChange={handleDurationChange} // Pass the callback
                           />
                       </div>
                   </div>
                   <DialogFooter className="basis-24 flex justify-end mt-4">
                       <button
                           className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
                           onClick={handleSubmitRequest}
                       >
                           Submit Request
                       </button>
                       <button
                           onClick={() => setIsOpen(false)}
                           className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition-colors duration-300"
                       >
                           Close
                       </button>
                   </DialogFooter>
               </DialogContent>
           </Dialog>
       </div>
   );
};

export default ExpandedRide;