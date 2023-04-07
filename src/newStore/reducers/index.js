import { combineReducers } from "redux";
import auth from "./auth";
import userDetails from "./userdetail";
import activeUser from "./activeUser";
import betPlace from "./betPlace";
import matchDetails from "./matchDetails";
import currentUser from "./currentUser";

export default combineReducers({
  auth: auth,
  userDetails: userDetails,
  activeUser: activeUser,
  betPlace: betPlace,
  matchDetails: matchDetails,
  currentUser: currentUser
});
