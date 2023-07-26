import { useEffect, useState } from "react";
import { Box, Typography, TextField, CircularProgress } from "@mui/material";
import { Background } from "../../components";
import EventListing from "../../components/EventListing";
import { toast } from "react-toastify";
import { setRole } from "../../newStore";

const ChangeButtonValue = ({ selected, visible }) => {
  const { axios } = setRole();
  const [id, setId] = useState("");
  const [loader,setLoader]=useState(false)
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


  useEffect(() => {
    getButtonList();
  }, []);

  function customSort(a, b) {
    if (a.label === "1k") {
      return -1; // "1k" comes first
    } else if (b.label === "1k") {
      return 1; // "1k" comes first
    } else {
      // For other labels, maintain their original order
      return 0;
    }
  }
  const getButtonList = async () => {
    try {
      const { data } = await axios.get("/users/getButtonValues");
      setId(data?.data?.id)
      const initialData = data?.data?.buttons; // Replace this with your initial data
      const jsonObject = JSON.parse(initialData);
      // Update the state using the spread operator to keep the existing objects
      const updatedState = valueLabel.map((item, index) => {
        return {
          ...item,
          lable: Object.keys(jsonObject)[index],
          value: Object.values(jsonObject)[index],
        };
      });
      updatedState.sort(customSort);
      // Now update the state with the updatedState
      setValueLabel(updatedState);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error", e.message);
    }
  };

  const setButtonList = async () => {
    setLoader(true)
    const convertedData = valueLabel.reduce((result, item) => {
      if (item.value) {
        result[item.lable] = item.value;
      }
      return result;
    }, {});
    var payload = {
      buttons: convertedData,
      id: id
    };
    try {
      const { data } = await axios.post("/users/setButtonValues", payload);
      toast.success(data?.message);
      setLoader(false)
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error", e.message);
      setLoader(false)
    }
  };

  const handleLabelChange = (index, newValue, type) => {
    if (type == "label") {
      setValueLabel((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index].lable = newValue;
        return updatedValues;
      });
    } else {
      setValueLabel((prevValues) => {
        const updatedValues1 = [...prevValues];
        updatedValues1[index].value = newValue;
        return updatedValues1;
      });
    }

    // alert(JSON.stringify(valueLabel))
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
                  return <ValButton key={index} value={item} index={index} onChange={handleLabelChange} />;
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
                cursor:"pointer"
              }}
            >
              <Typography
                sx={{ fontSize: { laptop: "18px", mobile: "20px" } }}
                color={"white"}
              >
               {loader ? (
        <CircularProgress
          sx={{
            color: "#FFF",
          }}
          size={20}
          thickness={4}
          value={60}
        />
      ) : (
        "Update"
      )} 
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
        value={value.lable}
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
        type="number" // Allow only numeric input
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
