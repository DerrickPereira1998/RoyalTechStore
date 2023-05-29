import axios from "axios";

//Pega qualquer porta disponivel 
const PORT = process.env.PORT 
const http = axios.create({
    baseURL: PORT
})

export default http