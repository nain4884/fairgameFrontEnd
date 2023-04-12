import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authprovider';

const UseTokenUpdate = () => {
    const [tokenUpdated, setTokenUpdated] = useState(false);
    const { tokenAdmin, tokenMaster, tokenExpert, tokenUser } = useContext(AuthContext);

    const handleStorageChange = (event) => {
       
            setTokenUpdated(true);
        
      };
      
      useEffect(() => {
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, [tokenAdmin, tokenMaster, tokenExpert, tokenUser]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const newTokenMaster = localStorage.getItem('JWTmaster');
    //         const newTokenAdmin = localStorage.getItem('JWTadmin');
    //         const newTokenUser = localStorage.getItem('JWTuser');
    //         const newTokenExpert = localStorage.getItem('JWTexpert');
    //         if (newTokenMaster !== tokenMaster) {
    //             setTokenUpdated(true);
    //         }
    //         if (newTokenAdmin !== tokenAdmin) {
    //             setTokenUpdated(true);
    //         }
    //         if (newTokenUser !== tokenUser) {
    //             setTokenUpdated(true);
    //         }
    //         if (newTokenExpert !== tokenExpert) {
    //             setTokenUpdated(true);
    //         }
    //     }, 0);
    //     return () => clearInterval(interval);
    // }, []);

    return tokenUpdated;
};

export default UseTokenUpdate;