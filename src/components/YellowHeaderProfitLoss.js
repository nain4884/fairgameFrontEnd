import { Box, Typography } from "@mui/material";
import Calendar from "./Calendar";
import CustomButtonAdmin from "./CustomButtonAdmin";
import SearchInputWallet from "./SearchInputWallet";

const YellowHeaderProfitLoss = ({
  type,
  clientData,
  setSearch,
  search,
  startDate,
  setEndDate,
  setStartDate,
  endDate,
  onClick,
  title
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: ".1vh",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          color: "white",
          marginLeft: "0.5%",
          fontWeight: "600",
          marginY: { laptop: "0.5%", mobile: "2%" },
          alignSelf: "start",
        }}
      >
       {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          flexDirection: "column",
          width: "99%",
          paddingY: { laptop: "0vh", mobile: "1vh" },
          background: "#F8C851",
          alignSelf: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { laptop: "60%", mobile: "100%" },
            flexDirection: { laptop: "row", mobile: "column" },
            padding: "10px 20px",
          }}
        >
          {type !== "user" && (
            <Box
              sx={{
                display: "block",
                width: { mobile: "100%", laptop: "40%" },
              }}
            >
              <Box sx={{ width: "10px" }}></Box>
              <SearchInputWallet
                containerStyle={{ width: "100% !important " }}
                data={clientData}
                title={"Search By Client Name"}
                setSearch={setSearch}
                search={search}
              />
            </Box>
          )}

          <Box sx={{ width: "10px" }}></Box>

          <Box
            sx={{ display: "flex", width: { mobile: "100%", laptop: "60%" } }}
          >
            <Box
              sx={{ display: "flex", width: { laptop: "70%", mobile: "60%" } }}
            >
              <Calendar
                title={"From"}
                startDate={startDate}
                setStartDate={setStartDate}
                sx={{ width: "50%" }}
              />
              <Box sx={{ width: "10px" }}></Box>

              <Calendar
                title={"To"}
                startDate={endDate}
                setStartDate={setEndDate}
                sx={{ width: "50%" }}
              />
            </Box>
            <Box sx={{ width: "10px" }}></Box>
            <Box
              sx={{
                width: { mobile: "40%", laptop: "30%" },
                alignSelf: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: ".3vh",
                  opacity: "0",
                }}
              >
                456
              </Typography>
              <CustomButtonAdmin
                onClick={onClick}
                btnStyle={{
                  width: { mobile: "100%", laptop: "100%" },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default YellowHeaderProfitLoss;
