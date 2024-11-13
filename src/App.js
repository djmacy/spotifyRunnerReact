import React, { useEffect, useState } from 'react';
import { getTestJson } from './services/spotifyService';
import Home from './components/pages/Home';
import Navbar from "./components/Navbar";
import RoutesComponent from "./Routes";

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     // Wrap the fetch call in an async function
    //     const fetchData = async () => {
    //         try {
    //             console.log("Fetching data from /spotifyRunner/testjson...");
    //             const result = await getTestJson();
    //
    //             if (result) {
    //                 setData(result);
    //                 console.log("Data fetched successfully:", result);
    //             } else {
    //                 console.log("No data returned from the endpoint.");
    //             }
    //         } catch (err) {
    //             console.error("Error fetching data:", err);
    //             setError(err.message);
    //         } finally {
    //             setLoading(false); // Set loading to false once the request completes
    //         }
    //     };
    //
    //     fetchData();
    // }, []);
    //
    // if (loading) return <h1>Loading...</h1>;
    // if (error) return <h1>Error: {error}</h1>;

    return (
        <div>
            <Navbar/>
            <RoutesComponent/>
        </div>

    );
}

export default App;
