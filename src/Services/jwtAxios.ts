import axios from "axios";
import store from "../Redux/Store";

const jwtAxios = axios.create();
jwtAxios.interceptors.request.use((request) => {
  request.headers = {
    token: store.getState().authState.user?.token,
    clientEmail: store.getState().authState.user?.email,
  };
  return request;
});

export default jwtAxios;
