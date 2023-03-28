import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authprovider';

const useTokenUpdate = () => {
    const [tokenUpdated, setTokenUpdated] = useState(false);
    const { tokenAdmin, tokenMaster, tokenExpert, tokenUser } = useContext(AuthContext);

    useEffect(() => {
        const interval = setInterval(() => {
            const newTokenMaster = localStorage.getItem('JWTmaster');
            const newTokenAdmin = localStorage.getItem('JWTadmin');
            const newTokenUser = localStorage.getItem('JWTuser');
            const newTokenExpert = localStorage.getItem('JWTexpert');
            if (newTokenMaster !== tokenMaster) {
                setTokenUpdated(true);
            }
            if (newTokenAdmin !== tokenAdmin) {
                setTokenUpdated(true);
            }
            if (newTokenUser !== tokenUser) {
                setTokenUpdated(true);
            }
            if (newTokenExpert !== tokenExpert) {
                setTokenUpdated(true);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [tokenAdmin, tokenMaster, tokenExpert, tokenUser]);

    return tokenUpdated;
};

export default useTokenUpdate;