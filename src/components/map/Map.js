import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ ipData }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const mapRef = useRef(null);
    const isMapInitialized = useRef(false);

    const initMap = (latitude, longitude) => {
        const newMap = L.map(mapRef.current).setView([latitude, longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(newMap);

        setMap(newMap);
        isMapInitialized.current = true;
    };

    useEffect(() => {
        if (!isMapInitialized.current) {
            const defaultLat = 51.505;
            const defaultLng = -0.09;
            initMap(defaultLat, defaultLng);
        } else if (ipData.location && map) {
            const { lat: latitude, lng: longitude } = ipData.location;

            map.setView([latitude, longitude], 13);

            if (marker) {
                marker.remove();
            }
            const newMarker = L.marker([latitude, longitude]).addTo(map);
            setMarker(newMarker);
        }
    }, [ipData]);

    return <div id="map" ref={mapRef} style={{ height: '100%', width: '100%' }}></div>;
};

export default Map;
