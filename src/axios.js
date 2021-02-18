// 对原生 axios 进行封装
import axios from 'axios';

const myAxios = axios.create({
    // axios 的 url 的基础路径,根据后端给的来调整
    baseURL: 'http://localhost:3000/',
    // 用于请求超时的时间，超过timeout的时间后，会直接报错
    timeout: 3000
});

// axios 请求拦截器
myAxios.interceptors.request.use(config => {
    // 拦截成功时执行该方法

    // 给请求头添加 token
    // const token = localStorage.token;
    //config是请求对象,给请求对象的头部加上身份验证(authorization)= token, 其中Bearer要不要取决于后端的验证规则
    //其中Authorization 可能为其它变量名,Bearer也可能不要
    // config.headers.token = 'Bearer ' + token;

    //将加好验证的请求对象返回
    return config;

}, err => {
    // 拦截失败时执行该方法
    //一般不会拦截失败,如果失败返回失败原因
    return err;
});

// axios 响应拦截器
myAxios.interceptors.response.use(res => {
    // 响应成功执行该方法
    //响应成功直接将响应返回到前端
    return res;
}, err => {
    // 响应失败执行该方法
    //响应失败将失败原因判断后给前端
    let message = '服务器连接失败';
    if (err && err.response) {
        switch (err.response.status) {
            case 401:
                message = '身份认证失败(401)';
                alert('未登录，请先登录');
                // $router.push('/login');
                // location.hash = '#/login';
                break;
            case 404: message = '请求资源找不到(404)'; break;
            case 500: message = '服务器错误(500)'; break;
            case 504: message = '网络超时(504)'; break;
        }
        return {
            data: {
                message,
                type: err.response.status,
                status: 0
            }
        }

    } else {
        return {
            data: {
                message: '服务器连接失败！',
                status: 0
            }
        }
    }

})

//将配置好的自己的myAxios暴露出去
export default myAxios;
