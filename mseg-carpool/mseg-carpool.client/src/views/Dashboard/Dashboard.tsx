import  { useState, useEffect } from "react";
import { Card, CardSection } from "@fluentui/react-cards";
import { Persona, PersonaSize, Text, PrimaryButton, DefaultButton } from "@fluentui/react";
import { useMsal } from "@azure/msal-react";
import Page from "../../components/Page";
import apiService from '../../API/ApiServices';


const STORAGE_KEY_PROFILE = "userProfile";
const STORAGE_KEY_RIDES = "rides";


const Dashboard = () => {
    const { instance } = useMsal();
    const userAccount = instance.getActiveAccount() || instance.getAllAccounts()[0];
    const initialProfile = JSON.parse(localStorage.getItem(STORAGE_KEY_PROFILE)) || {
        azureID: userAccount?.homeAccountId, // Ensure Azure ID is stored
        name: userAccount?.name,
        email: userAccount?.username,
        phoneNumber: "",
        location: "",
        carType: "",
        carPlate: "",
        carColor: "",
        carModel: ""
    };

    const initialRides = JSON.parse(localStorage.getItem(STORAGE_KEY_RIDES)) || [];

    const [profile, setProfile] = useState(initialProfile);
    const [rides, setRides] = useState(initialRides);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const auth = useMsal();
    const azureID = auth.accounts[0].localAccountId;

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_RIDES, JSON.stringify(rides));
    }, [rides]);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const carDetails = await apiService.getCarDetails(azureID);
                setProfile(prevProfile => ({
                    ...prevProfile,
                    ...carDetails,
                }));
            } catch (error) {
                console.error("Failed to fetch car details:", error);
                setErrorMessage(error.message || "An error occurred while fetching car details.");
            }
        };

        if (azureID) {
            fetchCarDetails();
        }
    }, [azureID]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));

        try {
            console.log("Sending update request for profile:", profile);
            console.log(azureID);
            await apiService.updateUserDetails(azureID, {
                name: profile.name,
                mobileNumber: profile.phoneNumber,
                location: profile.location,
            });

            await apiService.updateCarDetails(azureID, {
                carType: profile.carType,
                carPlate: profile.carPlate,
                carColor: profile.carColor,
                carModel: profile.carModel
            });

            console.log("Update successful");
            setErrorMessage(""); // Clear any previous error messages
        } catch (error) {
            console.error("Failed to update details:", error);
            setErrorMessage(error.message || "An error occurred while updating details.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    return (
        <Page>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Card style={{ maxWidth: '450px',padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff' }}>
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
                        {isEditing ? (
                            <div style={{ marginBottom: '10px' } }>
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
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
                            <>
                                <Text variant="large">Name: {profile.name}</Text>
                                <Text variant="large">Phone Number: {profile.phoneNumber || "Not provided"}</Text>
                            </>
                        )}
                    </CardSection>
                    <CardSection>
                        {isEditing ? (
                            <PrimaryButton text="Save" onClick={handleSave} />
                        ) : (
                            <PrimaryButton text="Edit" onClick={handleEdit} />
                        )}
                    </CardSection>
                    {errorMessage && (
                        <CardSection>
                            <Text variant="small" style={{ color: 'red' }}>{errorMessage}</Text>
                        </CardSection>
                    )}
                </Card>
                <Card style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff' }}>
                    <CardSection>
                        <Text variant="xLarge">Car Details</Text>
                    </CardSection>
                    <CardSection style={{ marginBottom: '10px' }}>
                        {isEditing ? (
                            <>
                                <label>Car Type</label>
                                <input
                                    type="text"
                                    name="carType"
                                    value={profile.carType}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                                <label>Car Plate</label>
                                <input
                                    type="text"
                                    name="carPlate"
                                    value={profile.carPlate}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                                <label>Car Color</label>
                                <input
                                    type="text"
                                    name="carColor"
                                    value={profile.carColor}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                                <label>Car Model</label>
                                <input
                                    type="text"
                                    name="carModel"
                                    value={profile.carModel}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </>
                        ) : (
                            <>
                                <Text variant="large">Car Type: {profile.carType || "Not provided"}</Text>
                                <Text variant="large">Car Plate: {profile.carPlate || "Not provided"}</Text>
                                    <Text variant="large">Car Color: {profile.carColor || "Not provided"}</Text>
                                    <Text variant="large">Car Model: {profile.carModel|| "Not provided"}</Text>
                            </>
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
            </div>
        </Page>
    );
};

export default Dashboard;
