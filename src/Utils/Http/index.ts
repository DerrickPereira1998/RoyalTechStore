import axios from "axios";

//Pega a porta a ser usada
const PORT = 'https://royal-tech-store.onrender.com/' // || 'http://localhost:5000/' 
const http = axios.create({
    baseURL: PORT
})

export default http