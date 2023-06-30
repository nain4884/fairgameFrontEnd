import { Box, Typography } from "@mui/material";
import { Background } from "../../components";
import EventListing from "../../components/EventListing";

const ChangeButtonValue = ({selected,visible}) => {
  const ValButton = ({ value }) => {
    return (
      <Box
        sx={{
          background: "white",
          height: "40px",
          marginTop: "5px",
          border: "2px solid #DEDEDE",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          px: "5px",
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Box>
      {visible ? <>
        <Box
            sx={{
              display: "flex",
              overflowX: "hidden",
              flexDirection: "column",
              flex: 1,
              justifyContent: "flex-start",
              overflowY: "auto",
              alignItems: "flex-start",
            }}
          >
            <EventListing selected={selected} />
          </Box>
        <Box
        sx={{
          width: { mobile: "96vw", laptop: "35vw", tablet: "35vw" },
          minWidth: { laptop: "450px", tablet: "450px", mobile: "0px" },
          marginTop: "10px",
          marginX: { mobile: "2vw", laptop: "5vw" },
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { laptop: "18px", mobile: "20px" },
            fontWeight: "700",
          }}
        >
          Change Button Values
        </Typography>
        <Box
          sx={{
            width: "100%",
            minHeight: "200px",
            background: "#F8C851",
            borderRadius: "5px",
            padding: "20px",
            marginTop: "10px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: "#202020",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Price Lable
              </Typography>
              {[
                "100",
                "5000",
                "10000",
                "25000",
                "50000",
                "100000",
                "200000",
                "500000",
              ].map((x) => {
                return <ValButton value={x} />;
              })}
            </Box>
            <Box sx={{ flex: 1, marginLeft: "10px" }}>
              <Typography
                sx={{
                  color: "#202020",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Price Value
              </Typography>
              {[
                "100",
                "5000",
                "10000",
                "25000",
                "50000",
                "100000",
                "200000",
                "500000",
              ].map((x) => {
                return <ValButton value={x} />;
              })}
            </Box>
          </Box>
          <Box
            sx={{
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              marginTop: "50px",
              marginBottom: "40px",
              width: "80%",
              background: "#0B4F26",
              borderRadius: "5px",
            }}
          >
            <Typography
              sx={{ fontSize: { laptop: "18px", mobile: "20px" } }}
              color={"white"}
            >
              Update
            </Typography>
          </Box>
        </Box>
      </Box>
      </> : 
      <Background>
      <Box
        sx={{
          width: { mobile: "96vw", laptop: "35vw", tablet: "35vw" },
          minWidth: { laptop: "450px", tablet: "450px", mobile: "0px" },
          marginTop: "10px",
          marginX: { mobile: "2vw", laptop: "5vw" },
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { laptop: "18px", mobile: "20px" },
            fontWeight: "700",
          }}
        >
          Change Button Values
        </Typography>
        <Box
          sx={{
            width: "100%",
            minHeight: "200px",
            background: "#F8C851",
            borderRadius: "5px",
            padding: "20px",
            marginTop: "10px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: "#202020",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Price Lable
              </Typography>
              {[
                "100",
                "5000",
                "10000",
                "25000",
                "50000",
                "100000",
                "200000",
                "500000",
              ].map((x) => {
                return <ValButton value={x} />;
              })}
            </Box>
            <Box sx={{ flex: 1, marginLeft: "10px" }}>
              <Typography
                sx={{
                  color: "#202020",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Price Value
              </Typography>
              {[
                "100",
                "5000",
                "10000",
                "25000",
                "50000",
                "100000",
                "200000",
                "500000",
              ].map((x) => {
                return <ValButton value={x} />;
              })}
            </Box>
          </Box>
          <Box
            sx={{
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              marginTop: "50px",
              marginBottom: "40px",
              width: "80%",
              background: "#0B4F26",
              borderRadius: "5px",
            }}
          >
            <Typography
              sx={{ fontSize: { laptop: "18px", mobile: "20px" } }}
              color={"white"}
            >
              Update
            </Typography>
          </Box>
        </Box>
      </Box>
    </Background>}
    </Box>
  );
};

export default ChangeButtonValue;
