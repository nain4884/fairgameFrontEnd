import { Background } from ".";
import ChangePasswordComponent from "./ChangePasswordComponent";


 const ChangePassword = ({ visible, selected }) => {
  return (
    <Background>
      <ChangePasswordComponent visible={visible} selected={selected} />
    </Background>
  );
};

export default ChangePassword



