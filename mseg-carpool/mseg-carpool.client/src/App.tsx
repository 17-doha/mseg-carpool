import "./App.css";

import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { DefaultButton } from "@fluentui/react";
import { useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider"


function App() {
    const { instance } = useMsal();

    // set active account
    useEffect(() => {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
            instance.setActiveAccount(accounts[0]);
        }
    }, [instance]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">{

        <>
            <div className="App">
                <AuthenticatedTemplate>
                    <Navbar />
                    <div className="content">
                        <Outlet />
                        <Footer />
                    </div>
                </AuthenticatedTemplate>

                <UnauthenticatedTemplate>
                    <Navigate to="/" replace />
                    <h1>Welcome to MSEG Carpool</h1>
                    <DefaultButton onClick={() => instance.loginRedirect()} primary>Login</DefaultButton>
                </UnauthenticatedTemplate>
            </div>
        </>
}</ThemeProvider>
    );
}

export default App;
