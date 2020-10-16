import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'


// 拦截重复请求
let pending = []; // 声明一个数组用于存储每个请求的url和对应的取消函数
let cancelToken = axios.CancelToken; // axios提供了cancelToken来取消请求
let cancelPending = (config) => {
    // 找到对应url，执行取消操作
    pending.forEach((item, index) => {
        if (item.url === config.url) {
            // console.log("拦截或response之后清除了", item.url);
            pending[index].cancelFun();
            pending.splice(index, 1);
        }
    });
}




// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// request interceptor
service.interceptors.request.use(
    config => {
        // 判断当前请求是否在pending中，存在就取消请求
        cancelPending(config);
        // 将本次的请求添加一个cancelToken标识，用于取消重复请求
        config.cancelToken = new cancelToken(cancel => {
            pending.push({
                url: config.url,
                cancelFun: cancel
            });
        });


        const token = store.state.token; //getToken();
        token && (config.headers['token'] = token);
        return config
    },
    error => {
        // do something with request error
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        // 从pending中移除已完成的请求
        cancelPending(response.config);


        const res = response.data;
        // (res.data && res.data.token) && setToken(res.data.token);
        // return res
        // if (res.code != 200) {
        //     if (res.code == 402 || res.code == 403) {
        //         // MessageBox.confirm("请登录后操作", "提示", {
        //         //     confirmButtonText: "好的",
        //         //     cancelButtonText: "取消",
        //         // }).then(() => {
        //         //     location.href = "/#/account";
        //         // }).catch(() => {
        //         // });
        //         location.href = "/#/account";
        //     } 
        //     // else if (res.code == 404) {
        //     //     history.go(-1);
        //     // }
        //     return Promise.reject(res.message);
        // } else {
        //     return res
        // }
        if (res.code != 200) {
            if (res.code == 402 || res.code == 403) {
                // location.href = "/#/account";
                store.dispatch("removeToken");
                router.replace("/account");
            }
            else if (res.code == 404) {
                // location.href = "/#/404";
                router.replace("/404");
            } else {
                return Promise.reject(res.message);
            }
        } else {
            return res
        }

    },
    error => {
        // console.log('err' + error) // for debug
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error)
    }
)

export default service
