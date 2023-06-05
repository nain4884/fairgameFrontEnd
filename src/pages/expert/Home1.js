import Background from "./Background";
import "./style.css";

import { memo } from "react";
import MatchListComp from "./MatchListComp";

function Home1() {
  return (
    <Background>
      {/* <Header /> */}
      <MatchListComp />
    </Background>
  );
}
export default memo(Home1);
