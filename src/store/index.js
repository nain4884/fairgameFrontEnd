import { configureStore } from '@reduxjs/toolkit'
import betplace from './betPlace'
import activeAdmin from './admin'
import activeUser from './activeUser'
import activeRole from './activeRole';
import { rootReducer } from './reducers/rootReducer';
import dailogModal from './dailogModal'

const logger = (store) => (next) => (action) => {
    let result = next(action);
    return result;
  };

const store = configureStore({
    reducer: {
        betplace,
        activeAdmin,
        activeUser,
        rootReducer,
        activeRole,
        dailogModal
    },
    middleware: [logger],
})

export default store