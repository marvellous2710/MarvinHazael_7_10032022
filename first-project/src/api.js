import axios from 'axios'
import  { CONFIG } from './config'

console.log(CONFIG)
export const instance  = axios.create({
  baseURL:  `http://${CONFIG.VUE_APP_API_URL}/users/`  
});

