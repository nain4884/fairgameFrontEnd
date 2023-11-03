import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BetLive,
  DailogModal,
  IndiaPakLive,
  SessionResult,
} from '../../components';
import Back from '../../expert/assets/back.webp';
import { setDailogData } from '../../store/dailogModal';

export default function Live() {
  const childRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sessionAllBet } = useSelector((state) => state?.expertMatchDetails);
  const [proLoss1, setProLoss1] = useState({});
  const [betId, setBetId] = useState();
  const [checkBetId, setCheckBetId] = useState(false);

  function showDialogModal(isModalOpen, showRight, message, navigateTo, state) {
    dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }));
    setTimeout(() => {
      dispatch(setDailogData({ isModalOpen: false }));
      navigateTo &&
        navigate(
          `/${window.location.pathname.split('/')[1]}/${navigateTo}`,
          state
        );
    }, [2000]);
  }
  const handleSession = (item) => {
    if (childRef.current) {
      childRef.current.childFunction(item); // Call the child function through the ref
    }
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: '0%',
        width: '100%',
        backgroundImage: `url(${Back})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      <Box display="flex">
        <Box flex={1} sx={{ margin: '10px' }}>
          <IndiaPakLive
            createSession={location?.state?.createSession}
            match={location?.state?.match}
            showDialogModal={showDialogModal}
            sessionEvent={location?.state?.sessionEvent}
            proLoss1={proLoss1}
            setCheckBetId={setCheckBetId}
            ref={childRef}
          />
          <SessionResult
            createSession={location?.state?.createSession}
            showDialogModal={showDialogModal}
            betId={betId}
            handleSession={handleSession}
            sessionEvent={location?.state?.sessionEvent}
          />
        </Box>
        <Box sx={{ margin: '10px', flex: 1, marginLeft: '0px' }}>
          {checkBetId && (
            <BetLive
              createSession={location?.state?.createSession}
              sessionEvent={location?.state?.sessionEvent}
              showDialogModal={showDialogModal}
              betData={sessionAllBet}
            />
          )}
        </Box>
      </Box>
      <DailogModal />
    </Box>
  );
}
