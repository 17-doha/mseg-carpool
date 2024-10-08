import React from "react";
import ReactDOM from "react-dom/client";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { RequestProvider } from "./context/RequestContext"; // Correct import path

initializeIcons();

const msalConfig = {
    auth: {
        clientId: "00d4e3d9-b642-4875-8a51-f08c2799f053",
        tenantId: "common"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <RequestProvider> {/* Wrap with RequestProvider */}
                <RouterProvider router={router} />
            </RequestProvider>
        </MsalProvider>
    </React.StrictMode>
);
