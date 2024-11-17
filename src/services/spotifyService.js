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

export const getPopPlaylist = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/spotifyRunner/popPlaylist`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const popPlaylist = await response.json();
        return popPlaylist;
    } catch (error) {
        console.error(`Error getting pop playlist: ${error}`);
    }
}

export const getRockPlaylist = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/spotifyRunner/rockPlaylist`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const rockPlaylist = await response.json();
        return rockPlaylist;
    } catch(error) {
        console.error(`Error getting rock playlist: ${error}`);
    }
};

export const getHipHopPlaylist = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/spotifyRunner/hipHopPlaylist`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const hipHopPlaylist = await response.json();
        return hipHopPlaylist;
    } catch(error) {
        console.error(`Error getting HipHop playlist: ${error}`);
    }
}

export const queuePlaylist = async (uris) => {
    try {
        const response = await fetch(`${API_BASE_URL}/spotifyRunner/queuePlaylist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uris),
            credentials: "include", // Important for sending cookies
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to queue playlist");
        }
        return await response.json();
    } catch (error) {
        console.error("Error queue playlist: " + error);
    }
}





















