import "./App.css";

import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { DefaultButton } from "@fluentui/react";
import { useEffect, useState } from "react";
import ProfileSetup from './components/ProfileSetup'; 

const App: React.FC = () => {
    const { instance, accounts } = useMsal();
    const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

    // set active account
    useEffect(() => {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
            instance.setActiveAccount(accounts[0]);
        }
    }, [instance]);

    useEffect(() => {
        const checkUserProfile = async () => {
            if (accounts.length > 0) {
                const user = accounts[0];
                const AzureID = user.localAccountId;
                //Check if the profile info is complete
                const response = await fetch(`http://localhost:5062/api/Users/check_profile?Id=${AzureID}`); 
                //returns a boolean value 
                //TODO 
                const data = await response.json();
                setIsProfileComplete(data); 
            }
        };

        checkUserProfile();
    }, [accounts]);

    if (isProfileComplete === null) {
        return <div>Loading...</div>;
    }

    return (
            <div className="App">
                {isProfileComplete ? (
                    <AuthenticatedTemplate>
                        <Navbar showNavs={true} />
                        <div className="content">
                            <Outlet />
                            <Footer />
                        </div>
                    </AuthenticatedTemplate>
                ) : (
                    <AuthenticatedTemplate>
                        <Navbar showNavs={false} /> 
                        <ProfileSetup />
                        <Footer />
                    </AuthenticatedTemplate>
                )}

                <UnauthenticatedTemplate>
                    <Navigate to="/" replace />
                    <h1>Welcome to MSEG Carpool</h1>
                    <DefaultButton onClick={() => instance.loginRedirect()} primary>Login</DefaultButton>
                </UnauthenticatedTemplate>
            </div>
    );
};

export default App;