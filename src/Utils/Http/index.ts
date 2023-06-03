import axios from "axios";

//Pega a porta a ser usada
const PORT = 'http://localhost:5000/' // || 'https://royal-tech-store.onrender.com/'
const http = axios.create({
    baseURL: PORT
})

export default http