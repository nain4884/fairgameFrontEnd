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
      {window.location.pathname === "/admin/list_of_clients" ? (
        <>
          <HomeSlide />
          <Account />
          <AccountList />
          <DailogModal />
        </>
      ) : (
        <></>
      )}
    </Background>
  );
}
