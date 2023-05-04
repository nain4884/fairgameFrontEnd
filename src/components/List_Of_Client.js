import {
  Background,
  HomeSlide,
  Account,
  AccountList,
  DailogModal,
} from ".";
import CustomHeader from "./CommonMasterAdminLayout/Header";

export default function Home() {
  function CondiionCheck(path) {
    let success = true
    success *=  ["admin","master" ].includes(path.split("/")[1])
    success *= path.split("/")[2] === "list_of_clients"
    return success
  }
  return (
    <Background>
      {CondiionCheck(window.location.pathname) ? (
        <>
          <CustomHeader />
          <HomeSlide />
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
