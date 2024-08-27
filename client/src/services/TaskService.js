import axios from "axios";

export async function CreateNewTask(task) {
  return await axios.post("http://localhost:8081/api/task", task, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}

export async function GetAllTasks() {
  return await axios.get("http://localhost:8081/api/task", {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}

export async function UpdateTask(id, updatedTask){
  return await axios.put(`http://localhost:8081/api/task/${id}`, updatedTask, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}

export async function DeleteTask(id) {
  return await axios.delete(`http://localhost:8081/api/task/${id}`, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}