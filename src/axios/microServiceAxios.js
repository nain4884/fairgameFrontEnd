import axios from "axios"
import { microServiceApiPath } from "../components/constants";
// get token from the http only cookie in production
// Token will change each time login happen in production
export default axios.create({
    baseURL : microServiceApiPath
})