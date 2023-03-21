export const setRole = () => {
    let role = "role4"
    let JWT = localStorage.getItem('JWTuser')
    let transPass = "isTransPasswordCreated4"
    let pattern1 = /super_master|super_admin|master|admin/
    let pattern2 = /fairgame_wallet|fairgame_admin/
    let pattern3 = /expert/
    if (pattern1.test(window.location.pathname)) {
        role = "role1"
        JWT = localStorage.getItem('JWTmaster')
        transPass = "isTransPasswordCreated1"
    }
    if (pattern2.test(window.location.pathname)) {
        role = "role2"
        JWT = localStorage.getItem('JWTadmin')
        transPass = "isTransPasswordCreated2"
    }
    if (pattern3.test(window.location.pathname)) {
        role = "role3"
        JWT = localStorage.getItem('JWTexpert')
        transPass = "isTransPasswordCreated3"
    }
    return { role,JWT,transPass }
}