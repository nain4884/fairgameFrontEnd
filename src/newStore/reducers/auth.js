import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: {},
  allRole: [],
  userAdmin: {},
  userExpert: {},
  userWallet: {},
  user: {},
  isTransPasswordCreated: false,
  loading: false,
  currentPageNo: 1,
  userData: [],
  subCurrentPageNo: 1,
  subUserData: [],
  currentStatementPage: 1,
  allbetsPage: 0,
  geoLocation: null,
};

export const logoutAuth = createAction('auth/logoutReset');

export const auth = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const role = action?.payload?.role?.roleName.trim();
      if (["admin", "master", "superAdmin", "superMaster"].includes(role)) {
        sessionStorage.setItem("JWTadmin", action.payload.access_token);
        localStorage.setItem("JWTadmin", action.payload.access_token);
        localStorage.setItem("role1", "role1");
        state.userAdmin = { roleType: "role1", ...action.payload };
      } else if (["fairGameWallet", "fairGameAdmin"].includes(role)) {
        localStorage.setItem("role2", "role2");
        sessionStorage.setItem("JWTwallet", action.payload.access_token);
        localStorage.setItem("JWTwallet", action.payload.access_token);
        state.userWallet = { roleType: "role2", ...action.payload };
      } else if (["expert"].includes(role)) {
        sessionStorage.setItem("JWTexpert", action.payload.access_token);
        localStorage.setItem("JWTexpert", action.payload.access_token);
        const userExpert = { roleType: "role3", ...action.payload };
        localStorage.setItem("role3", "role3");
        state.userExpert = userExpert;
      } else if (["user"].includes(role)) {
        sessionStorage.setItem("JWTuser", action.payload.access_token);
        localStorage.setItem("JWTuser", action.payload.access_token);
        localStorage.setItem("role4", "role4");
        const body = { roleType: "role4", ...action.payload };
        state.user = body;
      }
    },
    setPage: (state, action) => {
      state.currentPageNo = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSubPage: (state, action) => {
      state.subCurrentPageNo = action.payload;
    },
    setSubUserData: (state, action) => {
      state.subUserData = action.payload;
    },
    setCurrentStatementPage: (state, action) => {
      state.currentStatementPage = action.payload;
    },
    setallbetsPage: (state, action) => {
      state.allbetsPage = action.payload;
    },
    logout: (state, action) => {
      switch (action?.payload?.roleType) {
        case "role1":
          state.userAdmin = {};
          localStorage.removeItem("role1");
          sessionStorage.removeItem("JWTadmin", action.payload.access_token);
          localStorage.removeItem("JWTadmin", action.payload.access_token);
          sessionStorage.clear();
          break;
        case "role2":
          state.userWallet = {};
          localStorage.removeItem("role2");
          sessionStorage.removeItem("JWTwallet", action.payload.access_token);
          localStorage.removeItem("JWTwallet", action.payload.access_token);
          sessionStorage.clear();
          break;
        case "role3":
          state.userExpert = {};
          localStorage.removeItem("role3");
          sessionStorage.removeItem("JWTexpert", action.payload.access_token);
          localStorage.removeItem("JWTexpert", action.payload.access_token);
          sessionStorage.clear();
          break;
        case "role4":
          state.user = {};
          localStorage.removeItem("role4");
          sessionStorage.removeItem("JWTuser", action.payload.access_token);
          localStorage.removeItem("JWTuser", action.payload.access_token);
          sessionStorage.clear();
          break;
        default:
          state.guest = {};
          localStorage.removeItem("role");
          sessionStorage.removeItem("JWT", action.payload.access_token);
          sessionStorage.clear();
          break;
      }
    },

    setAllRoles: (state, action) => {
      state.allRole = action.payload;
    },
    setUpdatedTransPasswords: (state, action) => {
      state.isTransPasswordCreated = action.payload;
    },
    setGeoLocation: (state, action) => {
      state.geoLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    // This will handle the reset on logout
    builder.addCase(logoutAuth, () => initialState);
  },
});

export const {
  signIn,
  logout,
  setAllRoles,
  setUpdatedTransPasswords,
  setPage,
  setSubPage,
  setUserData,
  setSubUserData,
  setCurrentStatementPage,
  setallbetsPage,
  setGeoLocation,
} = auth.actions;

// export const selectCount = state => state.counter;

export default auth.reducer;
