import axios from "axios";

const PORT = process.env.PORT || 'http://localhost:5000/'
const http = axios.create({
    baseURL: PORT
})

export default http