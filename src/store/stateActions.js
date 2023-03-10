export let stateActions = {
    logout: (val) => {
		return { type: 'LOGOUT', role:val }
	},
    setUser: (role, jwt) => {
		return {
			type: 'SET_USER',
			payload: { role, jwt }
		}
	},
}