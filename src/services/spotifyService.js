const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTestJson = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/spotifyRunner/testjson`);
        if (!response.ok) {
            throw new Error("Failed to fetch test JSON");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching test JSON:", error);
    }
};

export const login = () => {
    window.location.href = `${API_BASE_URL}/spotifyRunner/login`;
};

export const checkSpotifyLogin = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/spotifyRunner/isSpotifyLoggedIn` , {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const isLoggedIn = await response.json();
        return isLoggedIn;
    } catch (error) {
        console.error("Error checking Spotify login login: " + error);
    }
};