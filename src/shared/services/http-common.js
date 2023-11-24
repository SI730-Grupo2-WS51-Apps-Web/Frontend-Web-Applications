import axios from "axios";
export default axios.create({
    baseURL : 'http://172.208.73.62:7298',
    headers : {"Content-Type": 'application/json'}
})
