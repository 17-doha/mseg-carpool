import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

interface MapRequestProps {
    onLocationSelect: (location: { lat: number, lng: number }) => void;
    origin: string;
    destination: string;
    coordinates: string;
}

const center = { lat: 30.0669, lng: 31.2241 };

const MapRequest: React.FC<MapRequestProps> = ({ onLocationSelect, origin, destination, coordinates }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBBUHvuvUsAZ4Bj2FbxGOR95pe2jcIg5Rs"
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [zoom, setZoom] = useState(6);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [directionsRequested, setDirectionsRequested] = useState(false);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);

    const assignCoords = (origin: string, destination: string, coordinates: string) => {
        const officeLocations: { [key: string]: { lat: number, lng: number } } = {

            'Zamalek': { lat: 30.063766324057067, lng: 31.21602628465705 },
            '5th Settlement': { lat: 30.010270, lng: 31.407254},
            'Smart Village': { lat: 30.071012, lng: 31.017022}
        };

        if (!coordinates) {
            throw new Error('Coordinates are required');
        }

        const coordinatesArray = coordinates.split(',');
        if (coordinatesArray.length !== 2) {
            throw new Error('Invalid coordinates format');
        }

        const parsedCoords = { lat: parseFloat(coordinatesArray[0]), lng: parseFloat(coordinatesArray[1]) };
        if (isNaN(parsedCoords.lat) || isNaN(parsedCoords.lng)) {
            throw new Error('Invalid coordinates values');
        }

        const originCords = officeLocations[origin] || parsedCoords;
        const destinationCords = officeLocations[destination] || parsedCoords;

        return { originCords, destinationCords };
    };

    const { originCords, destinationCords } = assignCoords(origin, destination, coordinates);
    console.log(originCords, destinationCords);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    const directionsCallback = useCallback((result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
        if (result !== null && status === 'OK') {
            setDirections(result);
        } else {
            console.error(`Directions request failed due to ${status}`);
        }
        setDirectionsRequested(false);
    }, []);

    useEffect(() => {
        if (isLoaded && !directionsRequested) {
            setDirectionsRequested(true);
        }
    }, [isLoaded]);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const position = event.latLng.toJSON();
            setMarkerPosition(position);
            onLocationSelect(position);
        }
    };

    const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const position = event.latLng.toJSON();
            setMarkerPosition(position);
            onLocationSelect(position);
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <GoogleMap
                mapContainerStyle={{ height: "400px", width: "100%" }}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
                options={{
                    mapId: "7c52568365d1edbf",
                    gestureHandling: "cooperative",
                    zoomControl: false,
                    streetViewControl: false,
                }}
            >
                {directionsRequested && (
                    <DirectionsService
                        options={{
                            origin: originCords,
                            destination: destinationCords,
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
        </div>
    );
};

export default MapRequest;