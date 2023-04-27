import React, { useState, useEffect } from 'react';
import Map from './components/map/Map';
import Search from './components/search/Search';

import './App.scss';

function App() {
    const [ipData, setIpData] = useState(null);

    useEffect(() => {
        fetchMyIP();
    }, []);

    const fetchMyIP = async () => {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        const geoResponse = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_nWKhrIPpmQIf6ojh5vy8lLBG7zbn4&ipAddress=${data.ip}`);
        const geoData = await geoResponse.json();
        setIpData(geoData);
    };

    return (
        <div className="App">
            <Search setIpData={setIpData} />
            {ipData && <Map ipData={ipData} />}
        </div>
    );
}

export default App;