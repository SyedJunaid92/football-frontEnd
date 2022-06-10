import axios from "axios";

export const API = axios.create({
  //baseURL: 'http://192.168.0.115:5000',
  baseURL: "https://football-backend-asad.herokuapp.com",
});
