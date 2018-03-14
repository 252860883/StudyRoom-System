import axios from 'axios';
import Vue from 'vue';

// 请求接口的拦截器
axios.interceptors.request.use(function (config) {

    return config;
}, function (error) {

    return Promise.reject(error);
});


// 响应接口的拦截器
axios.interceptors.response.use(function (response) {
    // 这里面可以对axios做统一的处理
    return response;
}, function (error) {
    return Promise.reject(error);
});


Vue.prototype.$http = axios;