import {
  Background,
  HomeSlide,
  Account,
  AccountList,
  DailogModal,
} from "../../components";
import CustomHeader from "../../components/CommonMasterAdminLayout/Header";

export default function Home() {
  return (
    <Background>
      {window.location.pathname === "/admin/list_of_clients" ? (
        <> 
          <CustomHeader/>
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
