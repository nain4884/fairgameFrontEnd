import { CustomHeader, Input } from ".";
import { Box, Typography } from "@mui/material";
import { eye } from "../assets";
import { useCallback, useEffect, useState } from "react";

import { doSendErrorForPassword } from "./helper/doCheckErrorForPassword";
import { setRole } from "../newStore";
import { useDispatch } from "react-redux";
import { setUpdatedTransPasswords } from "../newStore/reducers/auth";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GlobalStore } from "../context/globalStore";

export const TransPassword = () => {
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
        <TransPasswordComponent />
      </Box>
    </>
  );
};

export const TransPasswordComponent = () => {
  return (
    <Box
      sx={{
        width: { mobile: "96vw", laptop: "22vw", tablet: "22vw" },
        minWidth: { laptop: "350px", tablet: "350px", mobile: "0px" },
        marginTop: "10px",
        marginX: { mobile: "2vw", laptop: "5vw" },
      }}
    >
      <TransPassComp />
    </Box>
  );
};

export const TransPassComp = ({ onCancel }) => {
  const dispatch = useDispatch();
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [passwordDetail, setPasswordDetail] = useState({
    1: { field: "transPassword", val: "" },
    2: { field: "confirmtransPassword", val: "" },
  });
  const [error, setError] = useState({
    1: { field: "transPassword", val: false },
    2: { field: "confirmtransPassword", val: false },
  });
  const [responseError, setResponseError] = useState();

  let { axios, roleName } = setRole();

  const generateTrandPassword = useCallback(async () => {
    if (
      !error[1].val &&
      !error[2].val &&
      passwordDetail[1].val !== "" &&
      passwordDetail[2].val !== ""
    ) {
      try {
        const payload = {
          transPassword: passwordDetail[1].val,
          confirmtransPassword: passwordDetail[2].val,
        };
        const { data } = await axios.post(
          `/fair-game-wallet/savetransPassword`,
          payload
        );

        if (data.message === "Transaction password update successfully.") {
          toast.success("Transaction saved successfully");

          dispatch(setUpdatedTransPasswords(true));
          onCancel();
        }
      } catch (e) {
        console.log(e);
        setResponseError(e.response.data.message);
      }
    }
  }, [axios, error, passwordDetail]);

  return (
    <>
      <Typography
        sx={{
          color: "white",
          fontSize: { laptop: "18px", mobile: "20px" },
          fontWeight: "700",
        }}
      >
        Create Transaction Password
      </Typography>
      <Box
        sx={{
          width: "400px",
          height: "460px",
          minHeight: "200px",
          background: "#F8C851",
          borderRadius: "5px",
          padding: "20px",
          marginTop: "10px",
        }}
      >
        <Input
          placeholder={"Enter Password"}
          inputProps={{ type: "password" }}
          title={"Transaction Password"}
          titleStyle={{
            color: "#222222",
            marginLeft: "0px",
            fontWeight: "600",
          }}
          inputContainerStyle={{ borderRadius: "5px" }}
          containerStyle={{}}
          img={eye}
          setDetail={setPasswordDetail}
          Detail={passwordDetail}
          setError={setError}
          error={error}
          place={1}
          onFocusOut={doSendErrorForPassword}
          toFoucs={true}
        />
        {error[1].val && <p style={{ color: "#fa1e1e" }}>{error[1].val}</p>}
        <Input
          placeholder={"Enter Confirm Password"}
          inputProps={{ type: "password" }}
          title={"Confirm Transaction Password"}
          titleStyle={{
            color: "#222222",
            marginLeft: "0px",
            fontWeight: "600",
          }}
          inputContainerStyle={{ borderRadius: "5px" }}
          containerStyle={{ marginTop: "30px" }}
          img={eye}
          setDetail={setPasswordDetail}
          Detail={passwordDetail}
          setError={setError}
          error={error}
          place={2}
          onFocusOut={doSendErrorForPassword}
          toFoucs={true}
        />
        {passwordDetail[1].val !== passwordDetail[2].val && (
          <p style={{ color: "#fa1e1e" }}>Password Doesn't match</p>
        )}
        <Box
          sx={{
            height: "50px",
            display: "flex",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            marginTop: "60px",
            marginBottom: "30px",
            width: "80%",
            background: "#0B4F26",
            borderRadius: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: { laptop: "18px", mobile: "20px" } }}
            color={"white"}
            onClick={generateTrandPassword}
          >
            Generate Password
          </Typography>
        </Box>
        <Box
          sx={{
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            marginTop: "10px",
            marginBottom: "40px",
            width: "80%",
            background: "#0B4F26",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: { laptop: "18px", mobile: "20px" } }}
            color={"white"}
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Typography>
        </Box>
        {responseError && <p style={{ color: "#fa1e1e" }}>{responseError}</p>}
      </Box>
    </>
  );
};
