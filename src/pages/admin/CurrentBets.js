import { Background, Header } from "../../components";
import BetsList from "../../components/BetsList";
import YellowHeaderBets from "../../components/yellowHeaderBets";

const CurrentBets = () => {
    return (
        <Background>
            {/* <Header /> */}
            <YellowHeaderBets />
            <BetsList />
        </Background>
    )
}
export default CurrentBets;