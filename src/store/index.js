import { configureStore } from '@reduxjs/toolkit'
// import selectedColorBox from './selectedColorBox'
import betplace from './betPlace'
// import userdetail from '../admin/store/userdetail'
// import depositModal from '../admin/store/depositModal'
// import creditLimitModal from '../admin/store/creditLimitModal'
// import withdrawModal from '../admin/store/withdrawModal'
// import exposureModal from '../admin/store/exposureModal'
// import changePasswordModal from '../admin/store/changePasswordModal'
// import dailogModal from '../admin/store/dailogModal'
// import currentSelected from '../admin/store/current_selected'
import activeAdmin from './admin'
import activeUser from './activeUser'
import { rootReducer } from './reducers/rootReducer';

const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.info("dispatching", action);
    let result = next(action);
    console.groupEnd();
    return result;
  };

const store = configureStore({
    reducer: {
        // selectedColorBox,
        betplace,
        // userdetail,
        // depositModal,
        // creditLimitModal,
        // withdrawModal,
        // exposureModal,
        // changePasswordModal,
        // dailogModal,
        // currentSelected,
        activeAdmin,
        activeUser,
        rootReducer
    },
    middleware: [logger],
})

export default store