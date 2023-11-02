import { useMediaQuery, useTheme } from "@mui/material";
import { Background } from "../../components";
import AccountStatementList from "../../components/AccountStatementList";

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