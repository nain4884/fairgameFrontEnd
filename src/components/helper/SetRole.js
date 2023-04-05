import adminAxios from "../../axios/adminAxios";
import expertAxios from "../../axios/expertAxios";
import masterAxios from "../../axios/masterAxios";
import userAxios from "../../axios/userAxios";

export const setRole = () => {
    let role = "role4"
    let JWT = localStorage.getItem('JWTuser')
    let transPass = "isTransPasswordCreated4"
    let pattern1 = /super_master|super_admin|master|admin/
    let pattern2 = /fairgame_wallet|fairgame_admin/
    let pattern3 = /expert/
    let axios = userAxios
    if (pattern1.test(window.location.pathname)) {
        role = "role1"
        JWT = localStorage.getItem('JWTmaster')
        transPass = "isTransPasswordCreated1"
        axios = masterAxios
    }
    if (pattern2.test(window.location.pathname)) {
        role = "role2"
        JWT = localStorage.getItem('JWTadmin')
        transPass = "isTransPasswordCreated2"
        axios = adminAxios
    }
    if (pattern3.test(window.location.pathname)) {
        role = "role3"
        JWT = localStorage.getItem('JWTexpert')
        transPass = "isTransPasswordCreated3"
        axios = expertAxios
    }
    return { role,JWT,transPass,axios,locPath:window.location.pathname.split('/')[1].trim() }
}