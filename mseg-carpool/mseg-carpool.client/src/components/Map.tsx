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

const MapPicker: React.FC<MapPickerProps> = ({  selectedLocation, onLocationSelect }) => {
  console.log('MapPicker rendered with selectedLocation:', selectedLocation);
  console.log('MapPicker rendered with defaultLocation:', defaultLocation);

  const handleMapClick = useCallback((e: MapMouseEvent) => {
    console.log('Map clicked:', e);
    const lat = e.detail.latLng ? e.detail.latLng.lat : 0;
    const lng = e.detail.latLng ? e.detail.latLng.lng : 0;
    console.log('Coordinates selected:', { lat, lng });
    onLocationSelect({ lat, lng });
  }, [onLocationSelect]);

  const defaultCenter = { lat: defaultLocation.lat, lng: defaultLocation.lng };

  return (
    <div>
      <APIProvider apiKey="AIzaSyCuH_djHLBBi8yD7vtWkMByZR32Rn7w1fQ">
        <div style={{ height: '400px', width: '100%' }}>
          <Map
            defaultZoom={12}
            defaultCenter={ defaultCenter }
            onClick={handleMapClick}
            streetViewControl={false}
            mapTypeControl={false}
            style={{ height: '100%', width: '100%' }} // Ensure the map takes up the full size of the container
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