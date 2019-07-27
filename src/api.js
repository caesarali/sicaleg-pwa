import axios from 'axios';

const $axios = axios.create({
    baseURL: 'https://sicaleg.web/api/v2',
    headers: {
        Authorization: localStorage.getItem('token') != 'null' ? 'Bearer ' + localStorage.getItem('token') : '',
        'Content-Type': 'application/json'
    }
});

// axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
// });

export default $axios;