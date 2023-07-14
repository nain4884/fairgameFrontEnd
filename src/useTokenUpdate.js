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

  return tokenUpdated;
};

export default UseTokenUpdate;