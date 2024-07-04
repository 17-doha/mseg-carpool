import Page from "../../components/Page";
import RideRow from "../../views/Rides/RideRow";
import './Rides.css';
import './RideRow.css';
import { useNavigate } from "react-router-dom";
function Rides() {
    const navigate = useNavigate();
    const handleCreateRide = () => {
        navigate('/Dashboard');
    };
    return (
        <Page>
                <div className="container">
                <button className="button" onClick={handleCreateRide}> + Create New Ride</button>
            </div>
            
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Driver</th>
                            <th>From</th>
                            <th>Destination</th>
                            <th>Pickup Time</th>
                            <th>Rides Left</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                </table>
                <RideRow driver="Ahmed" from="October" destination="Zamalek" pickuptime="10:00 AM 2024/07/05" count={3} status="Pending" />
                <RideRow driver="Ahmed" from="October" destination="Zamalek" pickuptime="10:00 AM 2024/07/05" count={3} status="Pending" />
            </div>

        </Page>
    );
}

export default Rides;
