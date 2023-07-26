import { CustomHeader, Input } from ".";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { eye, eyeLock } from "../assets";
import { useCallback, useEffect, useState } from "react";

import { doSendErrorForPasswordNumber } from "./helper/doCheckErrorForPassword";
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
    2: { field: "transPassword", val: "" },
    3: { field: "confirmtransPassword", val: "" },
  });
  const [error, setError] = useState({
    2: { field: "transPassword", val: false },
    3: { field: "confirmtransPassword", val: false },
  });
  const [responseError, setResponseError] = useState();

  let { axios, roleName } = setRole();
const [loading,setLoading]=useState(false)
  const generateTrandPassword = useCallback(async (e) => {
    e.preventDefault()
    setLoading(true)
    if (
      !error[2].val &&
      !error[3].val &&
      passwordDetail[2].val !== "" &&
      passwordDetail[3].val !== ""
    ) {
      try {
        const payload = {
          transPassword: passwordDetail[2].val,
          confirmtransPassword: passwordDetail[3].val,
        };
        const { data } = await axios.post(
          `/fair-game-wallet/savetransPassword`,
          payload
        );

        if (data.message === "Transaction password update successfully.") {
          toast.success("Transaction saved successfully");

          dispatch(setUpdatedTransPasswords(true));
          setLoading(false)
          onCancel();
        }
        setLoading(false)
      } catch (e) {
        console.log(e);
        setResponseError(e.response.data.message);
        setLoading(false)
      }
    }
  }, [axios, error, passwordDetail]);

  return (
    <form onSubmit={generateTrandPassword}>
      <Typography
        sx={{
          color: "white",
          fontSize: { laptop: "18px", mobile: "14px" },
          fontWeight: "700",
        }}
      >
        Create Transaction Password
      </Typography>
      <Box
        sx={{
          width: { laptop: "400px", mobile: "300px", tablet: "400px" },
          height: "450px",
          minHeight: "200px",
          background: "#F8C851",
          borderRadius: "5px",
          padding: "20px",
          marginTop: "10px",
        }}
      >
        <Input
        required={true}
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
          img1={eyeLock}
          setDetail={setPasswordDetail}
          Detail={passwordDetail}
          setError={setError}
          error={error}
          place={2}
          onFocusOut={doSendErrorForPasswordNumber}
          toFoucs={true}
          condition={true}
        />
        {error[2].val && <p style={{ color: "#fa1e1e" }}>{error[2].val}</p>}
        <Input
          required={true}
          placeholder={"Enter Confirm Password"}
          inputProps={{ type: "password" }}
          title={"Confirm Transaction Password"}
          titleStyle={{
            color: "#222222",
            marginLeft: "0px",
            fontWeight: "600",
          }}
          inputContainerStyle={{ borderRadius: "5px" }}
          containerStyle={{ marginTop: "20px" }}
          img={eye}
          img1={eyeLock}
          setDetail={setPasswordDetail}
          Detail={passwordDetail}
          setError={setError}
          error={error}
          place={3}
          onFocusOut={doSendErrorForPasswordNumber}
          toFoucs={true}
          condition={true}
        />
        {passwordDetail[2].val !== passwordDetail[3].val && (
          <p style={{ color: "#fa1e1e" }}>Password Doesn't match</p>
        )}
        <Button
        type="submit"
          sx={{
            height: "50px",
            display: "flex",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            marginTop: "30px",
            marginBottom: "20px",
            width: "80%",
            background: "#0B4F26",
            borderRadius: "5px",
            '&:hover': {
            background: "#0B4F26",
         },
          }}
        >
          <Typography
            sx={{ fontSize: { laptop: "18px", mobile: "14px" } }}
            color={"white"}
           
          >
          {loading ? (
            <CircularProgress
              sx={{
                color: "#FFF",
              }}
              size={20}
              thickness={4}
              value={60}
            />
          ) : (
            "Generate Password"
          )}
           
          </Typography>
        </Button>
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
            sx={{ fontSize: { laptop: "18px", mobile: "14px" } }}
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
    </form>
  );
};
