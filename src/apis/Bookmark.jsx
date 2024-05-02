import axios from "axios";

// const backendUrl = "http://localhost:8000";

const backendUrl = "https://backend-g9k3.onrender.com"

// Function to add a bookmark
export const addBookmark = async (storyId, slideId, token) => {
    try {
        const reqUrl = `${backendUrl}/api/ver1/bookmark`;
        const response = await axios.post(reqUrl, { storyId, slideId }, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to fetch bookmarks for the current user

export const getBookmarks = async (token, bookmarkId = null) => {
    try {
        const reqUrl = `${backendUrl}/api/ver1/bookmarks`;
        const response = await axios.get(reqUrl, { headers: { Authorization: `Bearer ${token}` } });

        // If bookmarkId is provided, filter the bookmarks to get the one with matching ID
        if (bookmarkId) {
            const bookmark = response.data.find(item => item._id === bookmarkId);
            const ret = bookmark ? [bookmark] : [];
            // console.log("ret",ret)
            return ret// Return an array with the matching bookmark or an empty array if not found
        }

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to delete a bookmark
export const deleteBookmark = async (slideId, token) => {
    try {
        const reqUrl = `${backendUrl}/api/ver1/unbookmark/${slideId}`;
        const response = await axios.delete(reqUrl, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};