import axios from "axios";

const apiInstance = axios.create({
    baseURL: 'http://10.1.252.81:8137/api/'
});

export default apiInstance