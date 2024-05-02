import axios from "axios";

// const backendUrl = "http://localhost:8000";
const backendUrl = "https://backend-g9k3.onrender.com"


//slides creation
export const slidesData = async (slides, token) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/story/addStory`; 
    const reqPayload = { slides }; 
    const response = await axios.post(reqUrl, reqPayload, {
      headers: { Authorization: `Bearer ${token}` } // Pass the token in the request headers
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//get all stories
export const getAllData = async () => {
    try {
      const reqUrl = `${backendUrl}/api/ver1/story/all`;
      const response = await axios.get(reqUrl);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //get story by id

export const getStory = async (_id) => {
    try {
      const reqUrl = `${backendUrl}/api/ver1/story/getStory/${_id}`; 
      const response = await axios.get(reqUrl); 
   console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  
export const getDataByCategory = async (category) => {
    try {
      const reqUrl = `${backendUrl}/api/ver1/story/all/cat?category=${category}`;
      const response = await axios.get(reqUrl);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //get all storied by userId

  export const getAllSlidesForUser = async (userId) => {
    try {
        const reqUrl = `${backendUrl}/api/ver1/story/slides/${userId}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


//update storiesData
export const updateStory = async (id, slides, token) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/story/updateStory/${id}`; // Construct the request URL with the story ID
    const reqPayload = { slides }; // Prepare the request payload with the updated slides
    const response = await axios.put(reqUrl, reqPayload, {
      headers: { Authorization: `Bearer ${token}` } // Pass the token in the request headers
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to update the likes count for a slide in a story
export const likeSlide = async (storyId, slideId) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/story/likeSlide/${storyId}/${slideId}`; // Construct the request URL with the story ID and slide ID
    // console.log("hi",reqUrl)
    const response = await axios.put(reqUrl);
    return response.data; // Return the response data (updated likes count)
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const dislikeSlide = async (storyId, slideId) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/story/dislikeSlide/${storyId}/${slideId}`; // Construct the request URL with the story ID and slide ID
    const response = await axios.put(reqUrl);
    return response.data; // Return the response data (updated likes count)
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLikesCount = async (storyId, slideId) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/story/likesCount/${storyId}/${slideId}`; // Construct the request URL with the story ID and slide ID
    const response = await axios.get(reqUrl);
    return response.data.likesCount; // Return the likes count from the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};






