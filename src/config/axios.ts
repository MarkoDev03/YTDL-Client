import axios from "axios";
import { Vars } from "./vars";

export const Axios = axios.create({
  baseURL: Vars.SERVER_URL
});