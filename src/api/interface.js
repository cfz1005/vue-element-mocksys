import http from '../utils/request'
import qs from 'qs'

export let add = async (data) => {
    return await http.post("/interface/add", qs.stringify(data));
}
export let update = async (data) => {
    return await http.post("/interface/update", qs.stringify(data));
}
export let remove = async (data) => {
    return await http.post("/interface/delete", qs.stringify(data));
}
export let getModelById = async (id) => {
    return await http.get("/interface/get-info?id="+id);
}
