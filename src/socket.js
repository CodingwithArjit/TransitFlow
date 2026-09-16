import { io } from "socket.io-client";

const socket = io("https://transitflow-backend-production.up.railway.app");
export default socket;