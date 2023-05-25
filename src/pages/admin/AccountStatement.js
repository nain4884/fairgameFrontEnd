import { Box, useMediaQuery, useTheme } from "@mui/material"
import { Background, Header } from "../../components";
import AccountStatementList from "../../components/AccountStatementList";
import YellowHeader from "../../components/yellowheader";
import YellowHeaderMobile from "../../components/YellowHeaderMobile";
import YellowHeaderAdmin from "../../components/YellowHeaderAdmin";

const AccountStatement = () => {
    const theme = useTheme()

    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))

    return (
        <Background>
            {/* <Header /> */}
            {/* {matchesMobile ? <YellowHeaderMobile /> : <YellowHeaderAdmin />} */}
            <AccountStatementList user={"admin"} />
        </Background>
    )
}
export default AccountStatement;