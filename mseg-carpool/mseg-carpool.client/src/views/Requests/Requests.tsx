import React, { useState, useEffect } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import Page from "../../components/Page";

const STORAGE_KEY = "requests";

const initialRequests = [
    { id: 1, from: "Tom", message: "Ride from Anywhere to Zamalek office at 10/06/24 10:00, you have 1 seat available." },
    { id: 2, from: "Jerry", message: "Ride from Anywhere to Zamalek office at 10/06/24 10:00, you have 1 seat available." },
];

function Requests() {
    const [requests, setRequests] = useState(() => {
        const savedRequests = localStorage.getItem(STORAGE_KEY);
        return savedRequests ? JSON.parse(savedRequests) : initialRequests;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    }, [requests]);

    const handleAccept = (id) => {
        console.log("Accepted request", id);
    };

    const handleDecline = (id, from) => {
        setRequests((prevRequests) => {
            const updatedRequests = prevRequests.filter(req => req.id !== id);
            alert(`Request from ${from} is declined`);
            return updatedRequests;
        });
    };

    return (
        <Page>
            <h1>Requests</h1>
            {requests.map((req) => (
                <div key={req.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                    <p><strong>Request from {req.from}</strong></p>
                    <p>{req.message}</p>
                    <PrimaryButton text="Accept" onClick={() => handleAccept(req.id)} style={{ marginRight: "10px" }} />
                    <DefaultButton text="Decline" onClick={() => handleDecline(req.id, req.from)} />
                </div>
            ))}
        </Page>
    );
}

export default Requests;
