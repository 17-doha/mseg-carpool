import React, { useCallback, useEffect, useState } from 'react';
import { APIProvider, Map, MapMouseEvent, Marker } from '@vis.gl/react-google-maps';

interface LatLng {
  lat: number;
  lng: number;
}

interface MapPickerProps {
  defaultLocation: LatLng;
  selectedLocation: LatLng | null;
  onLocationSelect: (location: LatLng) => void;
}


const MapPicker: React.FC<MapPickerProps> = ({ defaultLocation, selectedLocation, onLocationSelect }) => {
  const [mapCenter, setMapCenter] = useState<LatLng>(defaultLocation);

  useEffect(() => {
    setMapCenter(defaultLocation);
  }, [defaultLocation]);


  const handleMapClick = useCallback((e: MapMouseEvent) => {
    const lat = e.detail.latLng ? e.detail.latLng.lat : 0;
    const lng = e.detail.latLng ? e.detail.latLng.lng : 0;
    onLocationSelect({ lat, lng });
  }, [onLocationSelect]);

  return (
    <div>

      <APIProvider apiKey=""> //add key

        <div style={{ height: '400px', width: '100%' }}>
          <Map
            defaultZoom={12}
            center={mapCenter}
            onClick={handleMapClick}
            streetViewControl={false}
            mapTypeControl={false}
            style={{ height: '100%', width: '100%' }}
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
