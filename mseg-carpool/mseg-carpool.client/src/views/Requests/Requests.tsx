import React from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import Page from "../../components/Page";
import { useRequestContext } from "../../context/RequestContext";

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
        <Page>
            <h1>Requests</h1>
            {state.requests.map((req) => (
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
