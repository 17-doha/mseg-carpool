import React, { useState, useEffect } from "react";
import { Card, CardSection } from "@fluentui/react-cards";
import { Persona, PersonaSize, Text, PrimaryButton, DefaultButton } from "@fluentui/react";
import { useMsal } from "@azure/msal-react";
import Page from "../../components/Page";
import AddRideForm from "./AddRideForm";
import RideCard from "./RideCard";

const STORAGE_KEY_PROFILE = "userProfile";
const STORAGE_KEY_RIDES = "rides";

const Dashboard = () => {
    const { instance } = useMsal();
    const userAccount = instance.getActiveAccount() || instance.getAllAccounts()[0];
    const initialProfile = JSON.parse(localStorage.getItem(STORAGE_KEY_PROFILE)) || {
        name: userAccount?.name,
        email: userAccount?.username,
        phoneNumber: "",
    };

    const initialRides = JSON.parse(localStorage.getItem(STORAGE_KEY_RIDES)) || [];

    const [profile, setProfile] = useState(initialProfile);
    const [rides, setRides] = useState(initialRides);
    const [isEditing, setIsEditing] = useState(false);
    const [isAddRideFormOpen, setIsAddRideFormOpen] = useState(false);
    const [editingRide, setEditingRide] = useState(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_RIDES, JSON.stringify(rides));
    }, [rides]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleAddRide = () => {
        setIsAddRideFormOpen(true);
    };

    const handleAddRideClose = () => {
        setIsAddRideFormOpen(false);
        setEditingRide(null);
    };

    const addNewRide = (ride) => {
        if (editingRide !== null) {
            const updatedRides = rides.map((r) => (r.id === ride.id ? ride : r));
            setRides(updatedRides);
        } else {
            setRides([...rides, { ...ride, id: Date.now() }]);
        }
    };

    const handleEditRide = (ride) => {
        setEditingRide(ride);
        setIsAddRideFormOpen(true);
    };

    const handleDeleteRide = (id) => {
        const updatedRides = rides.filter((ride) => ride.id !== id);
        setRides(updatedRides);
    };

    const handleSaveRide = (updatedRide) => {
        const updatedRides = rides.map((ride) => (ride.id === updatedRide.id ? updatedRide : ride));
        setRides(updatedRides);
    };

    return (
        <Page>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>Dashboard</h1>
                <DefaultButton text="Add Ride" onClick={handleAddRide} />
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Card style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff' }}>
                    <CardSection>
                        <Persona
                            {...{
                                imageInitials: profile.name?.match(/\b\w/g)?.join("").toUpperCase() || "",
                                text: profile.name,
                                secondaryText: profile.email,
                                size: PersonaSize.size72,
                            }}
                        />
                    </CardSection>
                    <CardSection style={{ marginBottom: '10px' }}>
                        <Text variant="large">Name: {profile.name}</Text>
                        <Text variant="large">Email: {profile.email}</Text>
                        {isEditing ? (
                            <div style={{ marginBottom: '10px' }}>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={profile.phoneNumber}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                        ) : (
                            <Text variant="large">Phone Number: {profile.phoneNumber || "Not provided"}</Text>
                        )}
                    </CardSection>
                    <CardSection>
                        {isEditing ? (
                            <PrimaryButton text="Save" onClick={handleSave} />
                        ) : (
                            <PrimaryButton text="Edit" onClick={handleEdit} />
                        )}
                    </CardSection>
                </Card>
                {rides.map((ride) => (
                    <RideCard key={ride.id} ride={ride} onEdit={handleEditRide} onDelete={handleDeleteRide} onSave={handleSaveRide} />
                ))}
            </div>
            {isAddRideFormOpen && <AddRideForm onClose={handleAddRideClose} addRide={addNewRide} ride={editingRide} />} {/* Render the Add Ride form */}
        </Page>
    );
};

export default Dashboard;
