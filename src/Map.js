import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';

function Map() {
    return (
        <div className="map">
            <MapContainer
            className="markercluster-map"
            center={[51.0, 19.0]}
            zoom={4}
            >
                <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy;<a href="http://osm.org/copyright">
                OpenStreetMap</a> contributors'/>
            </MapContainer>
        </div>
    )
}

export default Map
