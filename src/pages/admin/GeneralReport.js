import { Box } from "@mui/material"

import { Background, Header } from "../../components";
import GeneralReportList from "../../components/GeneralReportList";
import YellowHeaderGeneralReport from "../../components/YellowHeaderGeneralReport";

const GeneralReport = () => {

    return (
        <Background>
            {/* <Header /> */}
            <YellowHeaderGeneralReport />
            <GeneralReportList />
        </Background>
    )
}
export default GeneralReport;