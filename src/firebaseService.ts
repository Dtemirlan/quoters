import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://dzhaparov-temirlan-js20-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;
