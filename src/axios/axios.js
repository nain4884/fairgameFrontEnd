import axios from "axios"
import { apiBasePath } from "../components/helper/constants";
// get token from the http only cookie in production
// Token will change each time login happen in production
const token = "Bearer " + window.localStorage.getItem("JWT");
export default axios.create({
    headers: {
        Authorization: token,
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
    },
    baseURL: apiBasePath,
})