import axios from "axios";

const backendUrl = "http://localhost:8000"
// const backendUrl = 'https://backend-production-a777.up.railway.app';


export const userRegistration = async ({ name, password }) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/auth/register`;  // Corrected the URL
    const reqPayload = { name, password };  // Corrected the payload
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response)
    return response.data;  
  } 
  catch (error) {
    console.error(error);
    // Handle the error or throw it for the calling code to handle
    throw error;
  }
};


export const userLogin= async({name,password})=>{
  try {
    const reqUrl = `${backendUrl}/api/ver1/auth/login`; 
    const reqPayload={name,password};
    console.log(reqPayload)
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response.data)
   
   return response.data;
  } catch (error) {
    console.error(error);
   
    throw error;
    
  }

}

