import StyledImage from "./StyledImage";

const { Box, Typography } = require("@mui/material");

const ListSubHeaderT = ({ data }) => {
  // const defaultSumVal = {
  //   Credit_Referance: 0,
  //   Balance: 0,
  //   Profit_Loss: 0,
  //   Exposure: 0,
  //   Available_Balance: 0,
  //   Exposure_Limit: 0,
  //   Casino_Total: 0
  // }
  // const [sumVal, setSumVal] = useState({})
  // useEffect(() => {
  //   handleDefaultSumVal()
  //   updateDataValue()
  // }, [data])
  // function handleDefaultSumVal() {
  //   setSumVal(defaultSumVal)
  // }
  // function updateDataValue() {
  //   let Credit_Referance = 0
  //   let Balance = 0
  //   let Profit_Loss = 0
  //   let Exposure = 0
  //   let Available_Balance = 0
  //   let Exposure_Limit = 0
  //   let Casino_Total = 0
  //   data.map(element => {
  //     Credit_Referance += isNaN(parseInt(element.credit_refer)) ? 0 : parseInt(element.credit_refer)
  //     Balance += isNaN(parseInt(element.balance)) ? 0 : parseInt(element.balance)
  //     Profit_Loss += isNaN(parseInt(element.profit_loss)) ? 0 : parseInt(element.profit_loss)
  //     Exposure += isNaN(parseInt(element.exposure)) ? 0 : parseInt(element.exposure)
  //     Available_Balance += isNaN(parseInt(element.available_balance)) ? 0 : parseInt(element.available_balance)
  //     Exposure_Limit += isNaN(parseInt(element.exposure_limit)) ? 0 : parseInt(element.exposure_limit)
  //   });
  //   setSumVal({ ...sumVal, Credit_Referance, Balance, Profit_Loss, Exposure, Available_Balance, Exposure_Limit })
  // }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "45px",
        background: "#0B4F26",
        alignItems: "center",
        borderBottom: "2px solid white",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: { laptop: "11.5vw", tablet: "20.5vw", mobile: "24vw" },
          display: "flex",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}></Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "10.5vw", tablet: "10.5vw", mobile: "24vw" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.creditsum}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "24vw" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.balancesum}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "11.5vw", tablet: "11.5vw", mobile: "24vw" },
          display: "flex",
          paddingLeft: "10px",
          background: `${Number(data?.profitsum) >= 0 ? "#27AC1E" : "#E32A2A"}`,
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        {" "}
        {/* element.profit_loss >= 0 ? '#27AC1E' : '#E32A2A'*/}
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.profitsum}
        </Typography>
        <StyledImage
          src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
          sx={{
            height: "15px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: { laptop: "11.5vw", tablet: "11.5vw", mobile: "24vw" },
          display: "flex",
          paddingLeft: "10px",
          background: `${Number(data?.profitsum) >= 0 ? "#27AC1E" : "#E32A2A"}`,
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        {" "}
        {/* element.profit_loss >= 0 ? '#27AC1E' : '#E32A2A'*/}
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.percent_profit_loss}
        </Typography>
        <StyledImage
          src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
          sx={{
            height: "15px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "24vw" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.totalCommissions}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "24vw" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.exposuresum}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "24vw" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.availablebalancesum}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "5vw", tablet: "5vw", mobile: "24vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      ></Box>
      <Box
        sx={{
          width: { laptop: "5vw", tablet: "5vw", mobile: "24vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      ></Box>
      <Box
        sx={{
          width: { laptop: "8vw", tablet: "8vw", mobile: "24vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.exposurelimit}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "10vw", tablet: "10vw", mobile: "24vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      ></Box>
    </Box>
  );
};

export default ListSubHeaderT;
