import { useEffect, useState } from "react";
import { Background, Header } from "../../components";
import BetsList from "../../components/BetsList";
import YellowHeaderBets from "../../components/yellowHeaderBets";
import constants from "../../components/helper/constants";
import { setRole } from "../../newStore";

const CurrentBets = () => {
    const [pageLimit, setPageLimit] = useState(constants.pageLimit);
    const [pageCount, setPageCount] = useState(constants.pageLimit);
    const [currentPage, setCurrentPage] = useState(0);
    const [currenLimit, setCurrenLimit] = useState(1);
    const [betHistory, setBetHistory] = useState([]);

    useEffect(() => {
        getBetList();
    }, [currentPage, pageLimit]);

    const handleGetLimitEntries = (childLimitData) => {
        setPageLimit(childLimitData);
    };

    function handlecallPage(val) {
        setCurrentPage(parseInt(val));
        setCurrenLimit(parseInt(val));
    }

    async function getBetList() {
        var payload = {
            limit: pageLimit,
            skip: currentPage * pageLimit,
        };
        let { axios } = setRole();
        try {
            const { data } = await axios.post(`/betting/currentAllMatchBet`, payload);
            setBetHistory(data.data[0]);
            setPageCount(
                Math.ceil(parseInt(data.data[1] ? data.data[1] : 1) / pageLimit)
            );
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Background>
            {/* <Header /> */}
            <YellowHeaderBets />
            <BetsList betHistory={betHistory} handleGetLimitEntries={handleGetLimitEntries} handlecallPage={handlecallPage} currentPage={currentPage} currenLimit={currenLimit} pageCount={pageCount} />
        </Background>
    )
}
export default CurrentBets;