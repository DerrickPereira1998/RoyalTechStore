import axios from "axios";

//Pega a porta a ser usada
let PORT = ''
if (process.env.NODE_ENV === "production") {
  PORT = 'https://royal-tech-store.onrender.com/'
}
else {
  PORT = 'http://localhost:5000/' 
}
const http = axios.create({
  baseURL: PORT
})

export default http