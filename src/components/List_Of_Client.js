import { useLocation } from "react-router-dom";
import { Background, HomeSlide, Account, AccountList, DailogModal } from ".";
import CustomHeader from "./CommonMasterAdminLayout/Header";
import { useState } from "react";

export default function Home() {
  function CondiionCheck(path) {
    let success = true;
    success *= ["admin", "wallet"].includes(path.split("/")[1]);
    success *= path.split("/")[2] === "list_of_clients";
    return success;
  }
  // const [clientProfitLossDrilling, setClientProfitLossDrilling] = useState("")
  return (
    <Background>
      {CondiionCheck(window.location.pathname) ? (
        <>
          {/* <HomeSlide /> */}
          <Account />
          <AccountList />
          {/* <UserDetailModal />
            <DepositModal />
            <SetCreditModal />
            <WithDrawModal />
            <SetExposureModal />
            <ChangePasswordModal />*/}
          <DailogModal />
        </>
      ) : (
        <></>
      )}
    </Background>
  );
}
