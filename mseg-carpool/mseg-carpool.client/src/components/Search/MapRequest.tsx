import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const center = { lat: 41.85, lng: -87.66 };

const MapRequest: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCuH_djHLBBi8yD7vtWkMByZR32Rn7w1fQ"
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [directionsRequested, setDirectionsRequested] = useState(false);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    const directionsCallback = React.useCallback((result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
        if (result !== null && status === 'OK') {
            setDirections(result);
        } else {
            console.error(`Directions request failed due to ${status}`);
        }
        setDirectionsRequested(false);
    }, []);

    React.useEffect(() => {
        if (isLoaded && !directionsRequested) {
            setDirectionsRequested(true);
        }
    }, [isLoaded]);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setMarkerPosition(event.latLng.toJSON());
        }
    };

    const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setMarkerPosition(event.latLng.toJSON());
        }
    };

    const handleSubmitCoordinates = () => {
        if (markerPosition) {
            console.log('Submitted coordinates:', markerPosition);
            // Here you can implement the logic to submit the coordinates
            // For example, send them to a server or update your app's state
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <GoogleMap
                mapContainerStyle={{ height: "100px", width: "250%" }}
                center={center}
                zoom={6}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
                options={{
                    mapId: "7c52568365d1edbf",
                    gestureHandling: "greedy",
                    zoomControl: false,
                    streetViewControl: false,
                }}
            >
                {directionsRequested && (
                    <DirectionsService
                        options={{
                            origin: { lat: 41.8781, lng: -87.6298 },
                            destination: { lat: 34.0522, lng: -118.2437 },
                            travelMode: google.maps.TravelMode.DRIVING,
                        }}
                        callback={directionsCallback}
                    />
                )}
                {directions && <DirectionsRenderer directions={directions} />}
                {markerPosition && (
                    <Marker
                        position={markerPosition}
                        draggable={true}
                        onDragEnd={handleMarkerDragEnd}
                    />
                )}
            </GoogleMap>
            <button onClick={handleSubmitCoordinates} disabled={!markerPosition}>
                Submit Coordinates
            </button>
        </div>
    );
};

export default MapRequest;