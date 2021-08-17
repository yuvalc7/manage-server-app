import axios from 'axios';
const apiUrl = "http://localhost:8080/api/servers";

export function getServers(){
    return axios.get(apiUrl);
}

export function addServer(server){
    return axios.post(apiUrl, server)
}

export function updateServer(id, server){
    return axios.put(apiUrl+ "/" + id,server)
}

export function deleteServer(id){
    return axios.delete(apiUrl + "/" + id)
}