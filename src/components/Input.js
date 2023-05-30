import {
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  createStyles,
  withStyles,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { onChangeKeyCheck } from "./helper/PassKeyCheck";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const Input = ({
  props,
  title,
  setMypar,
  value,
  containerStyle,
  required,
  placeholder,
  imgstyle,
  titleStyle,
  inputStyle,
  inputContainerStyle,
  img,
  inputProps,
  setDetail,
  Detail,
  max,
  setError,
  error,
  min,
  place,
  type,
  onKeyDown,
  autoMaticFillValue,
  onFocusOut,
  toFoucs,
  handleError,
  checkMesasge,
  disabled,
  setDownlinePar,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("tablet"));
  const [showPass, setShowPass] = useState(true);
  const handleMypartnershipChange = debounce((e, place) => {
    const value = Number(e.target.value);
    if (value < 0) {
      setDetail({
        ...Detail,
        [11]: {
          ...Detail[11],
          val: value,
        },
      });
      setError({
        ...error,
        [11]: {
          ...error[11],
          val: "value must be 0 or greater",
        },
      });
      return false;
    }
    if (value >= 100) {
      setDetail({
        ...Detail,
        [12]: {
          ...Detail[12],
          val: 0,
        },
      });
      setError({
        ...error,
        [11]: {
          ...error[11],
          val: "sum of upline , downline and  my partnership should be not exceeding 100.",
        },
      });
      return false;
    }
    const updatedMypartnership = value > 0 ? value : 0;
    const subsum = Detail[10].val + updatedMypartnership;
    if (subsum >= 100) {
      setDetail({
        ...Detail,
        [12]: {
          ...Detail[12],
          val: 0,
        },
        [place]: {
          ...Detail[place],
          val: updatedMypartnership,
        },
      });
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: "sum of upline , downline and  my partnership should be not exceeding 100.",
        },
      });
      setDownlinePar(0);
      return false;
    }
    const updatedDowwnline = 100 - subsum;

    if (updatedDowwnline <= 0) {
      setDownlinePar(0);
      setDetail({
        ...Detail,
        [12]: {
          ...Detail[12],
          val: 0,
        },
        [place]: {
          ...Detail[place],
          val: updatedMypartnership,
        },
      });
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: "sum of upline , downline and  my partnership should be not exceeding 100.",
        },
      });
    } else {
      setDownlinePar(updatedDowwnline);
      setDetail({
        ...Detail,
        [12]: {
          ...Detail[12],
          val: updatedDowwnline,
        },
        [place]: {
          ...Detail[place],
          val: updatedMypartnership,
        },
      });
    }
  }, 500);
  return (
    <Box sx={[{}, containerStyle]}>
      <Typography
        variant="inputHeader"
        sx={[
          {
            marginLeft: "10px",
            fontSize: { laptop: "10px", mobile: "12px" },
            fontWeight: "500",
          },
          titleStyle,
        ]}
      >
        {title}
      </Typography>
      <Box
        sx={[
          {
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",

            height: { laptop: "45px", mobile: "45px" ,tablet:"45px"},
            overflow: "hidden",
            paddingX: "10px",
            marginTop: "1px",
            borderRadius: "10px",
          },
          inputContainerStyle,
        ]}
      >
        {autoMaticFillValue ? (
          <TextField
            variant="standard"
            placeholder={placeholder}
            value={autoMaticFillValue}
            required={required}
            InputProps={{
              disableUnderline: true,
              justifyContent: "center",
              ...inputProps,
              placeholder: placeholder,
              type:
                showPass && String(title).toLowerCase().includes("password")
                  ? "password"
                  : type === "Number"
                  ? "number"
                  : "text",
              sx: [
                { fontSize: { laptop: "12px", mobile: "14px" } },
                inputStyle,
              ],
            }}
            sx={{
              borderColor: "white",
              display: "flex",
              flex: 1,
              fontSize: { laptop: "1px", mobile: "5px" },
            }}
            onChange={(e) => {
              String(title).toLowerCase().includes("password")
                ? setDetail({
                    ...Detail,
                    [place]: {
                      ...Detail[place],
                      val: autoMaticFillValue,
                    },
                  })
                : setDetail({
                    ...Detail,
                    [place]: {
                      ...Detail[place],
                      val:
                        type === "Number"
                          ? Number(autoMaticFillValue)
                          : autoMaticFillValue,
                    },
                  });
              setError({
                ...error,
                [place]: {
                  ...Detail[place],
                  val:
                    type === "Number"
                      ? Detail[place].val === 0
                      : Detail[place].val === "",
                },
              });
            }}
            disabled
          />
        ) : (
          <TextField
            variant="standard"
            placeholder={placeholder}
            value={value}
            onKeyDown={onKeyDown}
            required={required}
            InputProps={{
              min: 0,
              max: 100,
              disabled: disabled,
              placeholder: placeholder,
              disableUnderline: true,
              justifyContent: "center",
              ...inputProps,
              // value: Detail[9]?.val==="user" && Detail[place]?.val,
              type:
                showPass && String(title).toLowerCase().includes("password")
                  ? "password"
                  : type === "Number"
                  ? "number"
                  : "text",
              sx: [
                { fontSize: { laptop: "12px", mobile: "14px" } },
                inputStyle,
              ],
            }}
            sx={{
              borderColor: "white",
              display: "flex",
              flex: 1,
              fontSize: { laptop: "1px", mobile: "5px" },
            }}
            onChange={(e) => {
              String(title).toLowerCase().includes("password")
                ? setDetail({
                    ...Detail,
                    [place]: {
                      ...Detail[place],
                      val: e.target.value,
                    },
                  })
                : title === "My Partnership"
                ? handleMypartnershipChange(e, place)
                : setDetail({
                    ...Detail,
                    [place]: {
                      ...Detail[place],

                      val:
                        type === "Number"
                          ? title === "Upline Partnership"
                            ? Number(e.target.value) < 100 &&
                              Number(e.target.value)
                            : Number(e.target.value)
                          : e.target.value,
                    },
                  });
              String(title).toLowerCase().includes("password")
                ? setError({
                    ...error,
                    [place]: {
                      ...Detail[place],
                      val:
                        place === 14 ? "" : onChangeKeyCheck(Detail[place].val),
                    },
                  })
                : setError({
                    ...error,
                    [place]: {
                      ...Detail[place],
                      val:
                        type === "Number"
                          ? Detail[place].val === 0
                          : Detail[place].val === "",
                    },
                  });
              // checkMesasge && errorHandle(Detail[place].val)
            }}
            onBlur={(e) => {
              console.log("toFocus", toFoucs);
              toFoucs &&
                onFocusOut({
                  place,
                  val: Detail[place].val,
                  val2:e?.target.value ,
                  setError,
                  Detail,
                  error,
                });
            }}
          />
        )}
        {img && (
          <img
            src={img}
            onClick={() => {
              setShowPass(!showPass);
            }}
            alt="side input"
            style={{
              height: matches ? "0.5em" : "0.6rem",
              width: "auto",
              marginRight: ".5em",
              ...imgstyle,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Input;
