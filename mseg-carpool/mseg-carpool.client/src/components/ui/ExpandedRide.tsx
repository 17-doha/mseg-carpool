import {useState} from "react"
import { useMsal } from "@azure/msal-react";
import {
    Dialog,
    DialogOverlay,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
  } from "./dialog"
import MapRequest from "../Search/MapRequest"
import  {Ride, Driver}  from "../../lib/types";

interface RequestCreateDto {
  userId: string;
  rideId: number;
  status: string;
  coordinates: string;
}
const ExpandedRide = ({ ride, isOpen, setIsOpen}: {ride: Ride; isOpen: boolean; setIsOpen: (isOpen: boolean) => void}) => {
    const { instance } = useMsal();
    const userAccount = () => instance.getActiveAccount() || instance.getAllAccounts()[0];
    const [formData, setFormData] = useState<RequestCreateDto>({
        userId: userAccount().localAccountId,
        rideId: ride.rideID,
        status: 'Pending',
        coordinates: ''
    });

    const handleLocationSelect = (location: { lat: number, lng: number }) => {
        setFormData({
            ...formData,
            coordinates: `${location.lat},${location.lng}`
        });
    }
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

        setIsOpen(false);
    }


    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
                Expand Ride
            </button>
            <Dialog open={isOpen}>
                <DialogOverlay className="fixed inset-0 bg-black opacity-50" />
                <DialogContent
                    onInteractOutside={() => setIsOpen(false)}
                    className="container mx-auto bg-white rounded-lg shadow-lg p-4"
                >
                    <DialogHeader className="flex justify-between items-center mb-4">
                        <DialogTitle className="text-xl font-bold">Ride #927</DialogTitle>
                        <DialogClose className="text-gray-500 hover:text-gray-700 transition-colors duration-300" />
                    </DialogHeader>
                    <DialogDescription className="text-gray-600 mb-4">
                        This is an expanded ride description for ride #{ride.rideID} going to {ride.destination}. It will contain all the details of the ride.
                    </DialogDescription>
                     <MapRequest />
                    <DialogFooter className="flex justify-end mt-4">
                        <button 
                            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
                            onClick={() => handleSubmitRequest()}
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
}

export default ExpandedRide;