import React, { useEffect, useState } from 'react';
import { getTestJson } from './services/spotifyService';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Wrap the fetch call in an async function
        const fetchData = async () => {
            try {
                console.log("Fetching data from /spotifyRunner/testjson...");
                const result = await getTestJson();

                if (result) {
                    setData(result);
                    console.log("Data fetched successfully:", result);
                } else {
                    console.log("No data returned from the endpoint.");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false); // Set loading to false once the request completes
            }
        };

        fetchData();
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error}</h1>;

    return (
        <div>
            <h1>Fetched Data</h1>
            <ul>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </ul>
        </div>
    );
}

export default App;
