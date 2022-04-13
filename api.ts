import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin":  "*",
      // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
      }
    
  });

  export default api