import axios from 'axios';

const $axios = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

let token = localStorage.getItem('token')
if (token && token != 'null') {
    $axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export default $axios;