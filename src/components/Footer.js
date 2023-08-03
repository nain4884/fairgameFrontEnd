import { Box, Typography } from "@mui/material";

const Footer = ({ currentPage, pages, callPage, getListOfUser }) => {
    return (
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: { mobile: "5px", laptop: "10px" },
          justifyContent: "space-between",
          background: "#FAFAFA",
          // marginX: "0.5%",
          marginBottom: "20px",
        }}
      >
        <Typography
          sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}
        >
          Showing 1 to {pages}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              height: "35px",
              cursor: "pointer",
              width: { mobile: "80px", laptop: "100px" },
              background: "#0B4F26",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
            }}
            onClick={() => {
              callPage(
                parseInt(currentPage) - 1 === 0 ? 1 : parseInt(currentPage) - 1
              );
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "14px", mobile: "12px" },
              }}
            >
              Previous
            </Typography>
          </Box>
          <Box
            sx={{
              height: "35px",
              marginX: { laptop: "10px", mobile: "5px" },
              width: "40px",
              background: "#262626",
              display: "flex",
              borderRadius: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "14px", mobile: "12px" },
              }}
            >
              {currentPage}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "35px",
              width: { mobile: "80px", laptop: "100px" },
              background: "#0B4F26",
              display: "flex",
              borderRadius: "5px",
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              callPage(
                parseInt(currentPage) === pages
                  ? pages
                  : parseInt(currentPage) + 1
              );
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "14px", mobile: "12px" },
              }}
            >
              Next
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  

  export default Footer