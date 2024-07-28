import React, { useCallback } from 'react';
import { APIProvider, Map, MapMouseEvent, Marker } from '@vis.gl/react-google-maps';

interface LatLng {
  lat: number;
  lng: number;
}

interface MapPickerProps {
  selectedLocation: LatLng | null;
  onLocationSelect: (location: LatLng) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ selectedLocation, onLocationSelect }) => {
  const handleMapClick = useCallback((e: MapMouseEvent) => {
    const lat = e.detail.latLng ? e.detail.latLng.lat : 0;
    const lng = e.detail.latLng ? e.detail.latLng.lng : 0;
    onLocationSelect({ lat, lng });
  }, [onLocationSelect]);

  return (
    <div>
      <APIProvider apiKey="AIzaSyCuH_djHLBBi8yD7vtWkMByZR32Rn7w1fQ">
        <div style={{ height: '200px', width: '100%' }}>
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
    </div>
  );
};

export default MapPicker;