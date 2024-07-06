import React, { useState } from "react";
import Page from "../../components/Page";
import { PrimaryButton, TextField, Dialog, DialogType, DialogFooter, DefaultButton } from "@fluentui/react";
import { useMsal } from "@azure/msal-react";

const STORAGE_KEY = "requests";

function Dashboard() {
    const { instance } = useMsal();
    const userAccount = instance.getActiveAccount() || instance.getAllAccounts()[0];
    const userName = userAccount?.name || "User";

    const [hideDialog, setHideDialog] = useState(true);
    const [message, setMessage] = useState("");

    const openDialog = () => setHideDialog(false);
    const closeDialog = () => setHideDialog(true);

    const handleSend = () => {
        const newRequest = {
            id: Date.now(), 
            from: userName,
            message: message,
        };

        const existingRequests = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const updatedRequests = [...existingRequests, newRequest];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));

        setMessage("");
        closeDialog();
        alert("Your request has been sent");
    };

    return (
        <Page>
            <h1>Dashboard</h1>
            <PrimaryButton text="Request a Ride" onClick={openDialog} />

            <Dialog
                hidden={hideDialog}
                onDismiss={closeDialog}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: "Send a Message to the Driver",
                }}
            >
                <TextField
                    label="Message"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e, newValue) => setMessage(newValue || "")}
                />
                <DialogFooter>
                    <PrimaryButton onClick={handleSend} text="Send" />
                    <DefaultButton onClick={closeDialog} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </Page>
    );
}

export default Dashboard;
