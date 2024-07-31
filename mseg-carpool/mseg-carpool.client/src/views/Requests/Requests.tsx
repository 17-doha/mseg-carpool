import React from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import Page from "../../components/Page";
import { useRequestContext } from "../../context/RequestContext";
import "./Requests.css";
import { acceptRequest, deleteRequest } from "../../services/requestService";

function Requests() {
    const { state, dispatch } = useRequestContext();

    const handleAccept = async (id) => {
        try {
            await acceptRequest(id);
            dispatch({
                type: 'UPDATE_REQUEST_STATUS',
                payload: { id, status: 'Approved' },
            });
            window.location.reload(); // Reload the entire page
            alert(`Request ${id} is accepted`);
        } catch (error) {
            console.error("Error accepting request", error);
            alert(`Failed to accept request ${id}`);
        }
    };

    const handleDecline = async (id, from) => {
        try {
            await deleteRequest(id);
            dispatch({
                type: 'REMOVE_REQUEST',
                payload: id,
            });
            alert(`Request from ${from} is declined`);
        } catch (error) {
            console.error("Error declining request", error);
            alert(`Failed to decline request from ${from}`);
        }
    };

    return (
        <Page className="requests-container">
            <h1>Requests</h1>
            {state.requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                state.requests.map((req) => (
                    <div key={req.id} className="request-item">
                        <p>
                            <strong>Request from {req?.users?.name}</strong>
                        </p>
                        <p>
                            Ride from {req?.ride?.origin} to {req?.ride?.destination} at {new Date(req?.ride?.departureTime).toLocaleString()}, you have {req?.ride?.availableSeats} seat available.
                        </p>
                        <div className="actions">
                            <PrimaryButton text="Accept" onClick={() => handleAccept(req.id)} />
                            <DefaultButton text="Decline" onClick={() => handleDecline(req.id, req?.users?.name)} />
                        </div>
                    </div>
                ))
            )}
        </Page>
    );
}

export default Requests;
