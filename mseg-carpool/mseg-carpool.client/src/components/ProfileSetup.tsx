import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import {User} from '../lib/types';
import { useMsal } from '@azure/msal-react';
import Map from './Map';

interface ProfileSetupProps {}
interface LatLng {
    lat: number;
    lng: number;
  }

const ProfileSetup: React.FC<ProfileSetupProps> = () => {
    const [formData, setFormData] = useState({
        MobileNumber: '',
        Name: '',
        location: '',
    });
    const auth = useMsal();
    const azureID = auth.accounts[0].localAccountId;
    const { instance } = useMsal();
    const userAccount = () => instance.getActiveAccount() || instance.getAllAccounts()[0];
    const userInitials = () => {
        const account = userAccount();
        if (!account?.name) return "";

        // get initials with regex
        const initials = account.name.match(/\b\w/g) || [];
        return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
    };
    const email = userAccount().username;

    const initUser: User = {
        Id: azureID,
        Name: userInitials(),
        Location: '',
        MobileNumber: '',
        CarColor: null,
        CarModel: null,
        CarPlate: null,
        CarType: null,
        Email: email,
        Points: 0,
    }
    const [user, setUser] = useState<User>(initUser);
    const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
    const [isLocationValid, setIsLocationValid] = useState(true);


     const handleLocationSelect = (location: LatLng) => {
        setIsLocationValid(true);
        setSelectedLocation(location);
        setFormData({
            ...formData,
            location: `${location.lat},${location.lng}`
        });
        setUser({
            ...user,
            Location: `${location.lat},${location.lng}`
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setUser({
            ...user,
            [name]: value
            
        });

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.Location) {
            setIsLocationValid(false);
          }

        if (user.Location) {
            try {
                const response = await fetch(`http://localhost:5062/api/Users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                if (response.ok) {
                    alert('Profile updated successfully!');
                    console.log('New User:', JSON.stringify(user));
                    window.location.reload(); // Reload to check profile completion again
                } else {
                    const error = await response.text();
                    alert('Error: ' + error);
                    console.log('Failed New User:', JSON.stringify(user));

                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-3/6 relative z-50">
            <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <CardHeader>
                    <CardTitle>Complete Your Profile</CardTitle>
                    <CardDescription>Please provide the following details</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                name="MobileNumber"
                                value={formData.MobileNumber}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Name</label>
                            <input
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div >
                            <label className="block text-sm pb-4 font-medium text-gray-700">Default Location:</label>
                            <Map selectedLocation={selectedLocation} onLocationSelect={handleLocationSelect} />
                            {!isLocationValid && <p style={{ color: 'red' }}>Location is required.</p>}
                            
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileSetup;