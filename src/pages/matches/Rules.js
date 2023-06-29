import { Box, Typography } from "@mui/material";
import { Background } from "../../components";

const Rules = ({userPadding}) => {
  const ListHeader = () => {
    return (
      <Box
        sx={{
          width: "100%",
          height: "25px",
          background: "white",
          display: "flex",
          padding: "1px",
        }}
      >
        <Box
          sx={{
            width: { laptop: "3%", mobile: "6%" },
            height: "100%",
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "500", color: "white", fontSize: "12px" }}
          >
            No.
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "97%", mobile: "94%" },
            height: "100%",
            background: "black",
            display: "flex",
            marginLeft: "1px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "400",
              color: "white",
              fontSize: "10px",
              paddingLeft: "5px",
            }}
          >
            Description
          </Typography>
        </Box>
      </Box>
    );
  };
  const RowComponent = ({ index }) => {
    let flag = index % 2 != 0;
    return (
      <Box
        sx={{
          width: "100%",
          height: "35px",
          background: "white",
          display: "flex",
          padding: "1px",
          paddingTop: "0px",
        }}
      >
        <Box
          sx={{
            width: { laptop: "3%", mobile: "6%" },
            height: "100%",
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "500", color: "white", fontSize: "12px" }}
          >
            {index + 1}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "97%", mobile: "94%" },
            height: "100%",
            background: flag ? "#ECECEC" : "#FFE094",
            display: "flex",
            marginLeft: "1px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "400",
              color: "black",
              fontSize: { laptop: "10px", mobile: "8px" },
              paddingLeft: "5px",
            }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et
          </Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Background>
      <Typography
        sx={{
          fontSize: { mobile: "12px", laptop: "15px" },
          marginLeft: { laptop: "2px", mobile: "3px" },
          marginTop: "10px",
          marginBottom: "5px",
          color: "white",
          fontWeight: "bold",
          paddingTop:userPadding,
        }}
      >
        {"RULES"}
      </Typography>
      <ListHeader />
      {["", "", "", ""].map((value, index) => {
        return <RowComponent index={index} />;
      })}{" "}
    </Background>
  );
};

export default Rules;
