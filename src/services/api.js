import axios from "axios";
export const api = axios.create({baseURL:"/api",timeout:8000});
export const authService = {
  login: data => api.post("/auth/login", data),
  register: data => api.post("/auth/register", data)
};
export const busService = {getAll:()=>api.get("/buses"), getById:id=>api.get(`/buses/${id}`)};
export const routeService = {getAll:()=>api.get("/routes")};
export const stopService = {getAll:()=>api.get("/stops")};