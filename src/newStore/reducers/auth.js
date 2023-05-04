import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: {},
  allRole: [],
  userMaster: {},
  userExpert: {},
  userAdmin: {},
  user: {},
  loading: false,
};

export const auth = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const role = action?.payload?.role?.roleName.trim();
      if (["admin", "master", "superAdmin", "superMaster"].includes(role)) {
        sessionStorage.setItem("JWTmaster", action.payload.access_token);
        state.userMaster = { roleType: "role1", ...action.payload };
      } else if (["fairGameWallet", "fairGameAdmin"].includes(role)) {
        sessionStorage.setItem("JWTadmin", action.payload.access_token);
        state.userAdmin = { roleType: "role2", ...action.payload };
      } else if (["expert"].includes(role)) {
        sessionStorage.setItem("JWTexpert", action.payload.access_token);
        const userExpert = { roleType: "role3", ...action.payload };
        state.userExpert = userExpert;
      } else if (["user"].includes(role)) {
        sessionStorage.setItem("JWTuser", action.payload.access_token);
        const body = { roleType: "role4", ...action.payload };
        state.user = body;
      }
    },
    logout: (state, action) => {
      switch (action?.payload?.roleType) {
        case "role1":
          state.userMaster = {};
          sessionStorage.removeItem("JWTmaster", action.payload.access_token);
          break;
        case "role2":
          state.userAdmin = {};
          sessionStorage.removeItem("JWTadmin", action.payload.access_token);
          break;
        case "role3":
          state.userExpert = {};
          sessionStorage.removeItem("JWTexpert", action.payload.access_token);
          break;
        case "role4":
          state.user = {};
          sessionStorage.removeItem("JWTuser", action.payload.access_token);
          break;
        default:
          state.guest = {};
          sessionStorage.removeItem("JWT", action.payload.access_token);
          break;
      }
    },

    setAllRoles: (state, action) => {
      state.allRole = action.payload;
    },
  },
});

export const { signIn, logout, setAllRoles } = auth.actions;

// export const selectCount = state => state.counter;

export default auth.reducer;
