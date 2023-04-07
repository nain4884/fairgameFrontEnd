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
	setBalance: (payload ) => {
		return {
			type: 'SET_BAL',
			payload: payload
		}
	},
	setMatchDetails: (payload ) => {
		return {
			type: 'SET_MANUAL_BOOKMAKER',
			payload: payload
		}
	}
}