import axios from "axios";
const apiUrl = "http://localhost:8080/api/tasks";

export function getTasks() {
    return axios.get(apiUrl);
}  

export function addTask(text) {
    return axios.post(apiUrl, text);
}

export function updateTask(id, body) {
    return axios.put(apiUrl + "/" + id, body);
}

export function updateCheck(id, done) {  
    return axios.put(apiUrl + "/" + id, done);
}

export function updateTasks(done) {
    return axios.put(apiUrl, done);
}

export function deleteTaskAll(done) {
    return axios.delete(apiUrl, { done });

}

export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}

