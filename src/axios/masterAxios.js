import axios from "axios"
import { apiBasePath } from "../components/constants";
// get token from the http only cookie in production
// Token will change each time login happen in production
const token ="Bearer " + window.localStorage.getItem("JWTmaster");
export default axios.create({
    headers: {Authorization: token },
    baseURL : apiBasePath,
})