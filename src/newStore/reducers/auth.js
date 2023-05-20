import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: {},
  allRole: [],
  userAdmin: {},
  userExpert: {},
  userWallet: {},
  user: {},
  loading: false,
  currentPageNo:1
};

export const auth = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const role = action?.payload?.role?.roleName.trim();
      if (["admin", "master", "superAdmin", "superMaster"].includes(role)) {
        sessionStorage.setItem("JWTadmin", action.payload.access_token);
        state.userAdmin = { roleType: "role1", ...action.payload };
      } else if (["fairGameWallet", "fairGameAdmin"].includes(role)) {
        sessionStorage.setItem("JWTwallet", action.payload.access_token);
        state.userWallet = { roleType: "role2", ...action.payload };
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
    setPage:(state,action) => {
      state.currentPageNo = action.payload;
    },

    logout: (state, action) => {
      switch (action?.payload?.roleType) {
        case "role1":
          state.userAdmin = {};
          sessionStorage.removeItem("JWTadmin", action.payload.access_token);
          sessionStorage.clear();
          break;
        case "role2":
          state.userWallet = {};
          sessionStorage.removeItem("JWTwallet", action.payload.access_token);
          sessionStorage.clear();
          break;
        case "role3":
          state.userExpert = {};
          sessionStorage.removeItem("JWTexpert", action.payload.access_token);
          sessionStorage.clear();
          break;
        case "role4":
          state.user = {};
          sessionStorage.removeItem("JWTuser", action.payload.access_token);
          sessionStorage.clear();
          break;
        default:
          state.guest = {};
          sessionStorage.removeItem("JWT", action.payload.access_token);
          sessionStorage.clear();
          break;
      }
    },

    setAllRoles: (state, action) => {
      state.allRole = action.payload;
    },
    setUpdatedTransPasswords: (state, action) => {
      const role = action?.payload?.role?.roleName.trim();
      if (["admin", "master", "superAdmin", "superMaster"].includes(role)) {
        const body = {
          ...state.userAdmin,
          isTransPasswordCreated: true,
        };
        console.log("UpdatedTrans", body);
        state.userAdmin = body;
      } else if (["fairGameWallet", "fairGameAdmin"].includes(role)) {
        state.userWallet = {
          ...state.userWallet,
          isTransPasswordCreated: true,
        };
      }
    },
  },
});

export const { signIn, logout, setAllRoles, setUpdatedTransPasswords,setPage } =
  auth.actions;

// export const selectCount = state => state.counter;

export default auth.reducer;
