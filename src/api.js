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

$axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Do something with response error
    console.log(error.response.status)
    return Promise.reject(error);
});

export default $axios;