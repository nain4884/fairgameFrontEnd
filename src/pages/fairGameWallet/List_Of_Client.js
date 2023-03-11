import {
  Background,
  HomeSlide,
  Account,
  AccountList,
  DailogModal,
} from "../../components";

export default function Home() {
  return (
    <Background>
      {window.location.pathname === "/fairgame_wallet/list_of_clients" ? (
        <>
          {/* <Header /> */}
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
