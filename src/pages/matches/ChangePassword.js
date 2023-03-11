import { CustomHeader, Input } from "../../components";
import { Box, Typography } from "@mui/material";
import { eye } from "../../assets";

export const ChangePassword = () => {
  return (
    <>
      <CustomHeader showSideBar={true} />
      <Box
        flex={1}
        sx={[
          { flex: 1, display: "flex" },
          (theme) => ({
            backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
          }),
        ]}
      >
        <ChangePasswordComponent />
      </Box>
    </>
  );
};

export const ChangePasswordComponent = () => {
    return(
    <Box
          sx={{
            width: { mobile: "96vw", laptop: "22vw", tablet: "22vw" },
            minWidth: { laptop: "350px", tablet: "350px", mobile: "0px" },
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
            Change Password
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
            <Input
              placeholder={"Enter Old Password"}
              inputProps={{ type: "password" }}
              title={"Old Password"}
              titleStyle={{
                color: "#222222",
                marginLeft: "0px",
                fontWeight: "600",
              }}
              inputContainerStyle={{ borderRadius: "5px" }}
              containerStyle={{}}
              img={eye}
            />
            <Input
              placeholder={"Enter New Password"}
              inputProps={{ type: "password" }}
              title={"New Password"}
              titleStyle={{
                color: "#222222",
                marginLeft: "0px",
                fontWeight: "600",
              }}
              inputContainerStyle={{ borderRadius: "5px" }}
              containerStyle={{ marginTop: "30px" }}
              img={eye}
            />
            <Input
              placeholder={"Enter Confirm Password"}
              inputProps={{ type: "password" }}
              title={"Confirm New Password"}
              titleStyle={{
                color: "#222222",
                marginLeft: "0px",
                fontWeight: "600",
              }}
              inputContainerStyle={{ borderRadius: "5px" }}
              containerStyle={{ marginTop: "30px" }}
              img={eye}
            />
            <Box
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mx: "auto",
                marginTop: "60px",
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
        </Box>)
}
