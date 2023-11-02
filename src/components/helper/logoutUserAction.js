import { useDispatch } from "react-redux";
import { logoutAuth } from "../../newStore/reducers/auth";
import { logoutCurrentUser } from "../../newStore/reducers/currentUser";
import { logoutMatchDetails } from "../../newStore/reducers/matchDetails";

// Import the reset actions for other slices as well...

const LogoutUser = () => {

  const dispatch = useDispatch();

    dispatch(logoutMatchDetails());
 
    dispatch(logoutCurrentUser());
    
    dispatch(logoutAuth());
   

};

export default LogoutUser;
