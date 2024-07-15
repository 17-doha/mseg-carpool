import React from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import Page from "../../components/Page";
import { useRequestContext } from "../../context/RequestContext";
import "./Requests.css";

function Requests() {
    const { state, dispatch } = useRequestContext();

    const handleAccept = (id) => {
        console.log("Accepted request", id);
    };

    const handleDecline = (id, from) => {
        dispatch({
            type: 'REMOVE_REQUEST',
            payload: id,
        });
        alert(`Request from ${from} is declined`);
    };

    return (
        <Page className="requests-container">
            <h1>Requests</h1>
            {state.requests.map((req) => (
                <div key={req.id} className="request-item">
                    <p><strong>Request from {req.from}</strong></p>
                    <p>{req.message}</p>
                    <div className="actions">
                        <PrimaryButton text="Accept" onClick={() => handleAccept(req.id)} />
                        <DefaultButton text="Decline" onClick={() => handleDecline(req.id, req.from)} />
                    </div>
                </div>
            ))}
        </Page>
    );
}

export default Requests;
