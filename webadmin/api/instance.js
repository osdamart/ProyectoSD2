import axios from "axios";
import { baseURL } from "../utils/constants";

export default axios.create({
  baseURL,
  cache: false
});
