import { memo } from 'react';
import { DailogModal } from '../../components';
import Background from './Background';
import MatchListComp from './Home1';
function BetFairOdds() {
  return (
    <Background>
      <MatchListComp />
      <DailogModal />
    </Background>
  );
}

export default memo(BetFairOdds);
