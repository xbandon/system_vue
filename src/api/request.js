import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8070',
    timeout: 5000
})

// request 拦截器
// 在请求发送前对请求做处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    if (user) {
        config.headers['token'] = user.token;  // 设置请求头
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// response 拦截器
// 在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果返回文件
        if (response.config.responseType === 'blob') {
            return res;
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res;
        }
        return res;
    },
    error => {
        console.log('err' + error);  // for debug
        return Promise.reject(error);
    }
)

export default request

