import http from '../utils/request'
import qs from 'qs'

export let login = async (data) => {
    return await http.post("/users/login", qs.stringify(data));
}

export let register = async (data) => {
    return await http.post("/users/register", qs.stringify(data));
}

export let getpwd = async (data) => {
    return await http.post("/users/getpwd", qs.stringify(data));
}

export let logout = async () => {
    return await http.post("/users/logout");
}

export let getuserinfo = async () => {
    return await http.get("/users/getuserinfo");
}

export let getbingbg = async () => {
    return await http.get("/bing/getbg");
}