import React from "react";
import Page from "../../components/Page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
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

    const handleMapClick = (req) => {
        const baseUrl = 'https://www.google.com/maps/dir/';
        const officeLocations = {
            'Zamalek': '30.063562, 31.216005',
            '5th Settlement': '30.010270, 31.407254',
            'Smart Village': '30.071012, 31.017022'
        };
        console.log(req?.ride);
        const originCords = officeLocations[req?.ride?.origin] || req?.ride?.coordinates;
        const destinationCords = officeLocations[req?.ride?.destination] || req?.ride?.coordinates;

        let url = `${baseUrl}${originCords}`;
        url += `/${req?.coordinates}`;
        url += `/${destinationCords}`;
        window.open(url, '_blank');
    };

    return (
        <Page className="requests-container">
         
            {state.requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                state.requests.map((req) => (
                    <div key={req.id} className="request-item">
                        <p>
                            <strong>Request from {req?.user?.name}</strong>
                        </p>
                        <p>
                            Ride from {req?.ride?.origin} to {req?.ride?.destination} at {new Date(req?.ride?.departureTime).toLocaleString()}, you have {req?.ride?.availableSeats} seat(s) available.
                        </p>
                        <div className="actions">
                            <button className="button-search" onClick={() => handleAccept(req.id)}>Accept</button>
                            <button className="button-search" onClick={() => handleDecline(req.id, req?.users?.name)}>Decline</button>
                            <button className="map-btn-req" onClick={() => handleMapClick(req)}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </Page>
    );
}

export default Requests;
