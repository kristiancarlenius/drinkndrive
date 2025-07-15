import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

function Routing({ from, to }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  React.useEffect(() => {
    if (!from || !to) return;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lon), L.latLng(to.lat, to.lon)],
      routeWhileDragging: false,
      showAlternatives: false,
      draggableWaypoints: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => map.removeControl(routingControlRef.current);
  }, [from, to, map]);

  return null;
}

function EmployeeMap() {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [error, setError] = useState('');

  async function geocode(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.length === 0) throw new Error('Address not found');
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  }

  const handleRoute = async () => {
    setError('');
    try {
      const fromC = await geocode(fromAddress);
      const toC = await geocode(toAddress);
      setFromCoords(fromC);
      setToCoords(toC);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h2>Employee Map</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="From Address"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          style={{ width: '45%', marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          style={{ width: '45%' }}
        />
        <button onClick={handleRoute} style={{ marginLeft: '1rem' }}>
          Show Route
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <MapContainer
        center={[59.9139, 10.7522]} // Oslo default center
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fromCoords && toCoords && <Routing from={fromCoords} to={toCoords} />}
      </MapContainer>
    </div>
  );
}

export default EmployeeMap;