import { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Background } from "../../components";
import EventListing from "../../components/EventListing";
import { toast } from "react-toastify";
import { setRole } from "../../newStore";

const ChangeButtonValue = ({ selected, visible }) => {
  const { axios } = setRole();
  const values = ["0", "1", "2", "3", "4", "5", "6", "7"];
  const [valueLabel, setValueLabel] = useState([
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
  ]);

  // const handleChange = (event) => {
  //   onChange(index, event.target.value);
  // };


  // const handleLabelChange = (item, newValue) => {
  //   const updatedValueLable = valueLable.map((value) => {
  //     if (value === item) {
  //       return { ...value, lable: newValue };
  //     }
  //     return value;
  //   });
  //   setValueLable(updatedValueLable);
  // };



  const setButtonList = async () => {
    // alert(JSON.stringify(valueLabel))
    return;
    var payload = {
      buttons: {
        "100": 100,
        "5000": 100,
        "10000": 100,
        "25000": 100,
        "100": 100,
        "100": 100,
        "100": 100,
        "100": 100,
      },
      id: ""
    };
    try {
      const { data } = await axios.post("/users/setButtonValues",);
      alert(JSON.stringify(data))
      // if (data?.data) {
      //   setNewRates(data?.data);
      // }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error", e.message);
    }
  };

  const LabelButton1 = ({ value, index, onChange }) => {
    const handleChange = (event) => {
      onChange(index, event.target.value);
    };
    return (
      <Box
        sx={{
          background: "white",
          height: "40px",
          marginTop: "5px",
          // border: "2px solid #DEDEDE",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          // px: "5px",
        }}
      >
        {/* <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
          {value}
        </Typography> */}
        <TextField
          value={value.lable}
          // onChange={handleChange}
          // // onChange={(event) => onChange(value, event.target.value)}
          // // onChange={handleChange}
          // variant="outlined"
          // size="small"
          // fullWidth
          // sx={{ fontSize: "14px", fontWeight: "600" }}
          // value={value.label}
          // onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ fontSize: "14px", fontWeight: "600" }}
          inputProps={{
            onBlur: (event) => event.target.blur(),
          }}
        />
      </Box>

    );
  };

  const ValButton1 = ({ value, index, onChange }) => {
    // const handleChange = (event) => {
    //   onChange(index, event.target.value);
    // };
    return (
      <Box
        sx={{
          background: "white",
          height: "40px",
          marginTop: "5px",
          // border: "2px solid #DEDEDE",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          // px: "5px",
        }}
      >
        {/* <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
          {value}
        </Typography> */}
        <TextField
        // value={value.value}
        // onChange={handleLabelChange}
        // variant="outlined"
        // size="small"
        // fullWidth
        // sx={{ fontSize: "14px", fontWeight: "600" }}
        // value={value.value}
        // // onChange={handleChange}
        // variant="outlined"
        // size="small"
        // fullWidth
        // sx={{ fontSize: "14px", fontWeight: "600" }}
        // inputProps={{
        //   onBlur: (event) => event.target.blur(),
        // }}
        />
      </Box>
    );
  };

  const handleLabelChange = (index, newValue, type) => {
    // alert(type);
    if (type == "label") {
      setValueLabel((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index].label = newValue;
        return updatedValues;
      });
    } else {
      setValueLabel((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index].value = newValue;
        return updatedValues;
      });
    }
  };

  return (
    <Box>
      {visible ? <>

        <Box
          sx={{
            width: { mobile: "96vw", laptop: "35vw", tablet: "35vw" },
            minWidth: { laptop: "450px", tablet: "450px", mobile: "0px" },
            marginTop: "10px",
            marginX: { mobile: "2vw", laptop: "1vw" },
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
                {valueLabel.map((item, index) => {
                  return <LabelButton key={index} value={item} index={index} onChange={handleLabelChange} />
                  // return 
                  // <LabelButton
                  //   key={index}
                  //   value={item}
                  //   index={index}
                  //   onChange={handleLabelChange} />;
                }
                )}
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
                {valueLabel.map((item, index) => {
                  return <ValButton value={item} index={index} onChange={handleLabelChange} />;
                })}
              </Box>
            </Box>
            <Box
              onClick={setButtonList}
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
                Update 1
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
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
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
                    // "100",
                    // "5000",
                    // "10000",
                    // "25000",
                    // "50000",
                    // "100000",
                    // "200000",
                    // "500000",
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
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

const LabelButton = ({ value, index, onChange }) => {
  const handleChange = (event) => {
    onChange(index, event.target.value, "label");
  };

  return (
    <Box
      sx={{
        background: "white",
        height: "40px",
        marginTop: "5px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        value={value.label}
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ fontSize: "14px", fontWeight: "600" }}
        inputProps={{
          onBlur: (event) => event.target.blur(),
        }}
      />
    </Box>
  );
};

const ValButton = ({ value, index, onChange }) => {
  const handleChange = (event) => {
    onChange(index, event.target.value, "value");
  };

  return (
    <Box
      sx={{
        background: "white",
        height: "40px",
        marginTop: "5px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        value={value.value}
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ fontSize: "14px", fontWeight: "600" }}
        inputProps={{
          onBlur: (event) => event.target.blur(),
        }}
      />
    </Box>
  );
};

export default ChangeButtonValue;
