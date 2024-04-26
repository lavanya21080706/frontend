import axios from "axios";

const backendUrl = "http://localhost:8000";


//slides creation
export const slidesData = async (slides) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/story/addStory`; 
    const reqPayload = { slides }; 
    console.log('request payload',reqPayload)
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// getting all stories

// export const getData = async () => {
//     try {
//       const reqUrl = `${backendUrl}/api/ver1/story/getStory`; 
//       const response = await axios.get(reqUrl); 
//    console.log(response.data)
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };

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
