import React, { useState } from 'react';

const Search = ({ setIpData }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const isIpAddress = (input) => {
        const ipPattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipPattern.test(input);
    };


    const searchIP = async (e) => {
        e.preventDefault();

        const apiUrl = isIpAddress(searchTerm)
            ? `https://geo.ipify.org/api/v1?apiKey=at_nWKhrIPpmQIf6ojh5vy8lLBG7zbn4&ipAddress=${searchTerm}`
            : `https://geo.ipify.org/api/v1?apiKey=at_nWKhrIPpmQIf6ojh5vy8lLBG7zbn4&domain=${searchTerm}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.location && data.location.lat && data.location.lng) {
            setIpData(data);
        } else {
            alert('Invalid IP address or domain. Please try again.');
        }
    };

    return (
        <form onSubmit={searchIP}>
            <input
                type="text"
                placeholder="Search for any IP address or domain"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;