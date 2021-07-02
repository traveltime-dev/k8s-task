import axios from "axios";

export const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const calculateCost = (body: any) => instance.post("/calculate", body);
const checkIfServerIsAlive = () => instance.get("/is-alive");

export const api = {
  calculateCost,
  checkIfServerIsAlive,
};
