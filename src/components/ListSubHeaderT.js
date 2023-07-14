import StyledImage from "./StyledImage";

const { Box, Typography } = require("@mui/material");

const ListSubHeaderT = ({ data }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "45px",
        background: "#0B4F26",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: { laptop: "11.5vw", tablet: "20.5vw", mobile: "26.5vw" },
          display: "flex",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          paddingX: "10px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}></Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "10.5vw", tablet: "10.5vw", mobile: "26.5vw" },
          display: "flex",
          paddingX: "10px",
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
          width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {/* {data?.balancesum} */}
          {Number(data?.balancesum) >= 0
            ? <><span style={{ visibility: "hidden" }}>-</span>{Number(data?.balancesum)}</>
            : Number(data?.balancesum)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "11.5vw", tablet: "11.5vw", mobile: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          background: `${Number(data?.profitsum) >= 0 ? "#27AC1E" : "#E32A2A"}`,
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "space-between",
        }}
      >
        {" "}
        {/* element.profit_loss >= 0 ? '#27AC1E' : '#E32A2A'*/}
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {/* {data?.profitsum} */}
          {Number(data?.profitsum) >= 0
            ? <><span style={{ visibility: "hidden" }}>-</span>{data?.profitsum}</>
            : data?.profitsum}
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
          width: { laptop: "11.5vw", tablet: "11.5vw", mobile: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          background: `${Number(data?.profitsum) >= 0 ? "#27AC1E" : "#E32A2A"}`,
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "space-between",
        }}
      >
        {" "}
        {/* element.profit_loss >= 0 ? '#27AC1E' : '#E32A2A'*/}
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {/* {data?.percent_profit_loss} */}
          {Number(data?.percent_profit_loss) >= 0
            ? <><span style={{ visibility: "hidden" }}>-</span>{data?.percent_profit_loss}</>
            : data?.percent_profit_loss}
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
          width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "26.5vw" },
          display: "flex",
          paddingX: "10px",
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
          width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "26.5vw" },
          display: "flex",
          paddingX: "10px",
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
          width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {/* {data?.availablebalancesum} */}
          {Number(data?.availablebalancesum) >= 0
            ? <><span style={{ visibility: "hidden" }}>-</span>{Number(data?.availablebalancesum)}</>
            : Number(data?.availablebalancesum)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { laptop: "5vw", tablet: "5vw", mobile: "14vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      ></Box>
      <Box
        sx={{
          width: { laptop: "5vw", tablet: "5vw", mobile: "14vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      ></Box>
      <Box
        sx={{
          width: { laptop: "8vw", tablet: "8vw", mobile: "26.5vw" },
          display: "flex",
          paddingX: "10px",
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
          width: { laptop: "10vw", tablet: "10vw", mobile: "26.5vw" },
          display: "flex",
          paddingX: "10px",
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
