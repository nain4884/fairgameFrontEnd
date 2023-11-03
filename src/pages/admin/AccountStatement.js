import { Background } from '../../components';
import AccountStatementList from '../../components/AccountStatementList';

const AccountStatement = () => {
  return (
    <Background>
      {/* <Header /> */}
      {/* {matchesMobile ? <YellowHeaderMobile /> : <YellowHeaderAdmin />} */}
      <AccountStatementList user={'admin'} />
    </Background>
  );
};
export default AccountStatement;
