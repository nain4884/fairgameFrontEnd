export let userActions = {
  signIn: (state, action) => {
    state.users = action.payload;
  },

};
