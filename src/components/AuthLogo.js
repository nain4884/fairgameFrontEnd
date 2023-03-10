import  StyledImage from "./StyledImage";
import { logo } from '../assets';

export default function AuthLogo({style}){
    return(
        <StyledImage 
            src={logo}
            alt="logo" sx={[{ height: {laptop:"8%",mobile:"10%"}, marginTop: "1em", width: {laptop:"58%",mobile:"85%"} },style]}
        />
    )
}