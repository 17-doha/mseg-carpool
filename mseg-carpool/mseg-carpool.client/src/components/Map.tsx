import React, { useState, useCallback } from 'react';
import { APIProvider, Map, MapCameraChangedEvent, MapMouseEvent, Marker } from '@vis.gl/react-google-maps';

interface LatLng {
  lat: number;
  lng: number;
}

const MapPicker: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const handleMapClick = useCallback((e: MapMouseEvent) => {
    const lat = e.detail.latLng ? e.detail.latLng.lat : 0;
    const lng = e.detail.latLng ? e.detail.latLng.lng : 0;
    setSelectedLocation({ lat, lng });
  }, []);

  const handleSubmit = () => {
    if (selectedLocation) {
      console.log('Selected coordinates:', selectedLocation);
      // Here you can send the coordinates to your backend or perform any other action
    } else {
      alert('Please select a location first');
    }
  };

  return (
    <div>
      <APIProvider apiKey="AIzaSyCuH_djHLBBi8yD7vtWkMByZR32Rn7w1fQ">
        <div style={{ height: '400px', width: '100%' }}>
          <Map
            defaultZoom={12}
            defaultCenter={{ lat: 30.0669, lng: 31.2241 }}
            onClick={handleMapClick}
          >
            {selectedLocation && (
              <Marker position={selectedLocation} />
            )}
          </Map>
        </div>
      </APIProvider>
      <button onClick={handleSubmit}>Submit Location</button>
      <input type="text" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
    </div>
  );
};

export default MapPicker;