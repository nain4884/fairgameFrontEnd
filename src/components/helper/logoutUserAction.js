import { useDispatch } from "react-redux";
import { logoutMatchDetails } from "../../newStore/reducers/matchDetails";
import { logoutCurrentUser } from "../../newStore/reducers/currentUser";
import { logoutAuth } from "../../newStore/reducers/auth";
import { useEffect } from "react";

// Import the reset actions for other slices as well...

const LogoutUser = () => {
  alert(11);
  const dispatch = useDispatch();

    dispatch(logoutMatchDetails());
    alert(22);
    dispatch(logoutCurrentUser());
    alert(33);
    dispatch(logoutAuth());
    alert(44);

};

export default LogoutUser;
