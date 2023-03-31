const initialState = {
    role: null,
    jwt: null
}

export let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER': {
            if (action.payload.jwt) {
                switch (action.payload.role.trim()) {
                    case "superAdmin":
                    case "master":
                    case "superMaster":
                    case "admin":
                        localStorage.setItem('JWTmaster', action.payload.jwt)
                        localStorage.setItem('role1', action.payload.role)
                        localStorage.setItem('isTransPasswordCreated1', action.payload.isTransPasswordCreated)
                        break;
                    case "expert":
                        localStorage.setItem('JWTexpert', action.payload.jwt)
                        localStorage.setItem('role3', action.payload.role)
                        localStorage.setItem('isTransPasswordCreated3', action.payload.isTransPasswordCreated)
                        break;
                    case "user":
                        localStorage.setItem('JWTuser', action.payload.jwt)
                        localStorage.setItem('role4', action.payload.role)
                        localStorage.setItem('isTransPasswordCreated4', action.payload.isTransPasswordCreated)
                        break;
                    case "fairGameWallet":
                    case "fairGameAdmin":
                        localStorage.setItem('JWTadmin', action.payload.jwt)
                        localStorage.setItem('role2', action.payload.role)
                        localStorage.setItem('isTransPasswordCreated2', action.payload.isTransPasswordCreated)
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
            switch (action.role.trim()) {
                case "role1":
                    localStorage.removeItem('JWTmaster')
                    localStorage.removeItem('role1')
                    localStorage.removeItem('isTransPasswordCreated1')
                    break;
                case "role3":
                    localStorage.removeItem('JWTexpert')
                    localStorage.removeItem('role3')
                    localStorage.removeItem('isTransPasswordCreated3')
                    break;
                case "role4":
                    localStorage.removeItem('JWTuser')
                    localStorage.removeItem('role4')
                    localStorage.removeItem('isTransPasswordCreated4')
                    break;
                case "role2":
                    localStorage.removeItem('JWTadmin')
                    localStorage.removeItem('role2')
                    localStorage.removeItem('isTransPasswordCreated2')
                    break;
                default:
                    localStorage.removeItem('JWT')
                    localStorage.removeItem('role')
                    break;
            }
            return { role: null, jwt: null, JWTadmin: null, JWTuser: null, JWTexpert: null, JWTmaster: null, role1: null, role2: null, role3: null, role4: null };
        }
        case 'SET_BAL': {
            switch (action.payload.role.trim()) {
                case "role1":
                    localStorage.setItem('Balance1', action.payload.amount) //JWTmaster
                    break;
                case "role3":
                    localStorage.setItem('Balance3', action.payload.amount) //JWTexpert
                    break;
                case "role4":
                    localStorage.setItem('Balance4', action.payload.amount) //JWTuser
                    break;
                case "role2":
                    localStorage.setItem('Balance2', action.payload.amount) //JWTadmin
                    break;
                default:
                    localStorage.setItem('Balance', action.payload.amount)
                    break;
            }
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
