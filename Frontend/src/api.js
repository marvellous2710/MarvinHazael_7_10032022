import axios from "axios";
import { CONFIG } from "./config";

console.log(CONFIG);


export const instance = axios.create({
  baseURL: `http://${CONFIG.VUE_APP_API_URL}/`,
  
});



instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    
    return Promise.reject(error);
    
  }
);



