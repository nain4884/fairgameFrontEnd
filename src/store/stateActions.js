export let stateActions = {
	logout: (val) => {
		return { type: 'LOGOUT', role: val }
	},
	setUser: (role, jwt, isTransPasswordCreated) => {
		return {
			type: 'SET_USER',
			payload: { role, jwt, isTransPasswordCreated }
		}
	},
	setBalance: (amount, role, exposure) => {
		return {
			type: 'SET_BAL',
			payload: { amount, role, exposure: exposure ? exposure : 0 }
		}
	}
}