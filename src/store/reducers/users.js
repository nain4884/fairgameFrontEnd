const initialState = {
    role: null,
    jwt: null
}

export let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER': {
            if (action.payload.jwt) {
                console.log("hi",action.type, action.payload.role.trim()==="superAdmin")
                switch (action.payload.role.trim()) {
                    case "superAdmin":
                    case "master":
                    case "superMaster":
                    case "admin":
                        localStorage.setItem('JWTmaster', action.payload.jwt)
                        localStorage.setItem('role1', action.payload.role)
                        break;
                    case "expert":
                        localStorage.setItem('JWTexpert', action.payload.jwt)
                        localStorage.setItem('role3', action.payload.role)
                        break;
                    case "user":
                        localStorage.setItem('JWTuser', action.payload.jwt)
                        localStorage.setItem('role4', action.payload.role)
                        break;
                    case "fairGameWallet":
                    case "fairGameAdmin":
                        localStorage.setItem('JWTadmin', action.payload.jwt)
                        localStorage.setItem('role2', action.payload.role)
                        break;
                    default:
                        localStorage.setItem('JWT', action.payload.jwt)
                        localStorage.setItem('role', action.payload.role)
                        break;
                }
            }
            return action.payload;
        }
        case 'LOGOUT': {
            console.log("action.payload.role",action.payload)
            switch (action.role.trim()) {
                case "role1":
                    localStorage.removeItem('JWTmaster')
                    localStorage.removeItem('role1')
                    break;
                case "role3":
                    localStorage.removeItem('JWTexpert')
                    localStorage.removeItem('role3')
                    break;
                case "role4":
                    localStorage.removeItem('JWTuser')
                    localStorage.removeItem('role4')
                    break;
                case "role2":
                    localStorage.removeItem('JWTadmin')
                    localStorage.removeItem('role2')
                    break;
                default:
                    localStorage.removeItem('JWT')
                    localStorage.removeItem('role')
                    break;
            }
            return { role: null, jwt: null, JWTadmin: null, JWTuser: null, JWTexpert: null, JWTmaster: null, role1: null, role2: null, role3: null, role4: null };
        }
        default: {
            return state;
        }
    }
}
