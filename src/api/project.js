import http from '../utils/request'
import qs from 'qs'

export let getMyList = async () => {
    return await http.get("/project/get-mylist");
}
export let getTeamList = async () => {
    return await http.get("/project/get-joinlist");
}
export let getModelById = async (id) => {
    return await http.get("/project/get-info?id="+id);
}
export let add = async(data)=>{
    return await http.post("/project/add",qs.stringify(data));
}
export let update = async(data)=>{
    return await http.post("/project/update",qs.stringify(data));
}
export let remove = async(data)=>{
    return await http.post("/project/delete",qs.stringify(data));
}
export let updateOwner = async(data)=>{
    return await http.post("/project/update-owner",qs.stringify(data));
}
export let getMemberList = async (id) => {
    return await http.get("/project/get-memberlist?id="+id);
}
export let addMember = async(data)=>{
    return await http.post("/project/add-member",qs.stringify(data));
}
export let removeMember = async(data)=>{
    return await http.post("/project/delete-member",qs.stringify(data));
}
export let getProjectById = async (id) => {
    return await http.get("/project/"+id);
}