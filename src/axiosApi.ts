import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://mamanov-emil-js-20-contacts-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;