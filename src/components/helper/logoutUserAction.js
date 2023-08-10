import { useDispatch } from "react-redux";
import { logoutMatchDetails } from "../../newStore/reducers/matchDetails";
import { logoutCurrentUser } from "../../newStore/reducers/currentUser";
import { logoutAuth } from "../../newStore/reducers/auth";
import { useEffect } from "react";

// Import the reset actions for other slices as well...

const LogoutUser = () => {

  const dispatch = useDispatch();

    dispatch(logoutMatchDetails());
 
    dispatch(logoutCurrentUser());
    
    dispatch(logoutAuth());
   

};

export default LogoutUser;
