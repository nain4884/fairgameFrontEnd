import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { EyeIcon, EyeSlash } from "../admin/assets";
import StyledImage from "./StyledImage";
import BoxButton from "./BoxButton";
import { useSelector } from "react-redux";

const MobileViewUserDetails = ({
  setSelected,
  handleAdminPass,
  handleChange,
  handleReview,
  amount,
  profit_loss,
  setShowPass,
  showPass,
  onCancel,
  onSubmit,
  initialBalance,
  backgroundColor,
  loading,
  title,
  userName,
  element,
  elementToUDM,
  titleBackgroundColor,
}) => {
  const { currentUser } = useSelector((state) => state?.currentUser);
  return (
    <Box
      sx={[
        {
          marginX: "0.5%",
          width: " 98%",
          minHeight: "200px",
          borderRadius: "10px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          overflow: "hidden",
          border: "2px solid white",
        },
        (theme) => ({
          backgroundImage: `${theme.palette.primary.headerGradient}`,
        }),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: titleBackgroundColor ? titleBackgroundColor : "#ff0000",
        }}
      >
        <Box
          display={"flex"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: "10px",
            py: "6px",
          }}
        >
          <Box
            display={"flex"}
            alignItems="center"
            sx={{ alignItems: "center" }}
          >
            <Typography
              sx={{
                fontSize: {
                  mobile: "16px",
                  laptop: "18px",
                  tablet: "18px",
                },
                color: "#FFF",
                marginRight: {
                  mobile: "10px",
                  laptop: "20px",
                  tablet: "20px",
                },
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <Button
          sx={{ color: "", fontSize: "30px", color: "#fff" }}
          onClick={setSelected}
        >
          &times;
        </Button>
      </Box>

      <Box
        sx={{
          borderBottom: "2px solid white",
          borderTop: "2px solid white",
          padding: "1%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          background: "#F8C851",
        }}
      >
        <Box
          sx={{
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              width: "100%",

              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "40%",
                flexDirection: "row",

                justifyContent: "space-between",
                position: "relative",
                marginTop: "0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "3.2vw",

                  width: "100%",
                  fontWeight: "600",
                  color: "white",
                  marginRight: 0,
                  color: "#000",
                  textTransform: "capitalize",
                  marginLeft: "5px",
                }}
              >
                {currentUser?.userName}
              </Typography>
            </Box>
            <Box
              sx={{
                background: Number(profit_loss) >= 0 ? "#27AC1E" : "#E32A2A",
                width: "30%",
                height: "45px",
                borderRadius: "5px",
                paddingX: "10px",
                marginTop: "0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  // color: "#000",
                  // textTransform: "capitalize",
                  // marginLeft: "5px"
                }}
              >
                {currentUser?.current_balance}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "30%",
                height: "45px",
                background: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid #26262633",
                paddingX: "10px",
              }}
            >
              <TextField
                value={initialBalance || 0}
                sx={{ width: "100%", height: "45px" }}
                variant="standard"
                InputProps={{
                  disabled: true,
                  placeholder: "",
                  disableUnderline: true,
                  type: "text",
                  style: {
                    fontSize: "13px",
                    height: "45px",

                    fontWeight: "600",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>{" "}
        <Box
          sx={{
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 1,
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "40%",
                flexDirection: "row",

                justifyContent: "space-between",
                position: "relative",
                marginTop: "0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "3.2vw",

                  width: "100%",
                  fontWeight: "600",
                  color: "white",
                  marginRight: 0,
                  color: "#000",
                  textTransform: "capitalize",
                  marginLeft: "5px",
                }}
              >
                {userName}
              </Typography>
            </Box>
            <Box
              sx={{
                background: Number(profit_loss) >= 0 ? "#27AC1E" : "#E32A2A",
                width: "30%",
                height: "45px",
                borderRadius: "5px",
                paddingX: "10px",
                marginTop: "0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {element?.available_balance
                  ? element?.available_balance.toFixed(2)
                  : "00"}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "30%",
                height: "45px",
                background: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid #26262633",
                paddingX: "10px",
              }}
            >
              <TextField
                value={
                  elementToUDM?.available_balance
                    ? elementToUDM?.available_balance.toFixed(2)
                    : "00"
                }
                sx={{ width: "100%", height: "45px" }}
                variant="standard"
                InputProps={{
                  disabled: true,
                  placeholder: "",
                  disableUnderline: true,
                  type: "text",
                  style: {
                    fontSize: "13px",
                    height: "45px",
                    fontWeight: "600",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
              flexDirection: "row",

              justifyContent: "space-between",
              position: "relative",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "3.2vw",

                width: "100%",
                fontWeight: "600",
                color: "white",
                marginRight: 0,
                color: "#000",
                textTransform: "capitalize",
                marginLeft: "5px",
              }}
            >
              Client Profit/Loss
            </Typography>
          </Box>
          <Box
            sx={{
              background: Number(profit_loss) >= 0 ? "#27AC1E" : "#E32A2A",
              width: "30%",
              height: "45px",
              borderRadius: "5px",
              paddingX: "10px",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                height: "45px",
                fontWeight: "600",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              {element?.profit_loss}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "30%",
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "10px",
            }}
          >
            <TextField
              value={profit_loss || 0}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                disabled: true,
                placeholder: "",
                disableUnderline: true,
                type: "text",
                style: {
                  fontSize: "13px",
                  height: "45px",
                  fontWeight: "600",
                },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
              flexDirection: "row",

              justifyContent: "space-between",
              position: "relative",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "3.2vw",

                width: "100%",
                fontWeight: "600",
                color: "white",
                marginRight: 0,
                color: "#000",
                textTransform: "capitalize",
                marginLeft: "5px",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              background: "#004A25",
              width: "60%",
              height: "45px",
              borderRadius: "5px",
              paddingX: "10px",
              marginTop: "0",
            }}
          >
            <TextField
              required={true}
              value={amount}
              onKeyDown={(event) => {
                if (
                  event.code === "Space" ||
                  (!(event.key >= "0" && event.key <= "9") &&
                    event.key !== "Backspace" &&
                    event.code !== "ArrowUp" &&
                    event.code !== "ArrowDown")
                ) {
                  event.preventDefault();
                }
              }}
              onChange={handleChange}
              variant="standard"
              InputProps={{
                placeholder: "Type Amount...",
                inputProps: { min: "0" },
                disableUnderline: true,
                style: {
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
              type={"Number"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
              flexDirection: "row",

              justifyContent: "space-between",
              position: "relative",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "3.2vw",

                width: "100%",
                fontWeight: "600",
                color: "white",
                marginRight: 0,
                color: "#000",
                textTransform: "capitalize",
                marginLeft: "5px",
              }}
            >
              Remarks
            </Typography>
          </Box>

          <Box
            sx={{
              borderRadius: "5px",
              background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
              display: "flex",
              border: "2px solid #26262633",
              minHeight: "80px",
              maxHeight: "115px",
              marginTop: "10px",
              width: "60%",
              paddingX: "2px",
            }}
          >
            <TextField
              onChange={handleReview}
              rows={4}
              sx={{ width: "100%", minHeight: "40px" }}
              multiline={true}
              variant="standard"
              InputProps={{
                placeholder: "Remark (Optional)",
                disableUnderline: true,
                style: {
                  fontSize: "13px",
                  minHeight: "45px",

                  fontWeight: "600",
                },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
              flexDirection: "row",

              justifyContent: "space-between",
              position: "relative",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "3vw",

                width: "100%",
                fontWeight: "600",
                color: "white",
                marginRight: 0,
                color: "#000",
                textTransform: "capitalize",
                marginLeft: "5px",
              }}
            >
              Transaction
            </Typography>
          </Box>

          <Box
            sx={{
              width: "60%",
              height: "45px",
              paddingLeft: "10px",
              paddingRight: "10px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
            }}
          >
            <TextField
              required={true}
              onChange={handleAdminPass}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: {
                  fontSize: "13px",
                  height: "45px",
                  fontWeight: "600",
                },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "4% 1%",
          width: "100%",
          justifyContent: "space-around",
          gap: 1,
          background: "#fff",
        }}
      >
        <BoxButton
          color={"#E32A2A"}
          containerStyle={{
            width: "150px",
            background: "#E32A2A",
            border: "0px",
            height: "45px",
          }}
          isSelected={true}
          onClick={onCancel}
          title={"Cancel"}
        />
        <BoxButton
          color={"#0B4F26"}
          loading={loading}
          containerStyle={{ width: "150px", height: "45px" }}
          isSelected={true}
          // onClick={onSubmit}
          type="submit"
          title={"Submit"}
        />
      </Box>
    </Box>
  );
};

export default MobileViewUserDetails;
