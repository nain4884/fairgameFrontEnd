import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADDACCOUNT,
  BASKETBALL,
  Card,
  CHECKLIST,
  CHESS,
  Cricket,
  Football,
  GOLF,
  Hockey,
  LIVEMARKET,
  MYACCOUNT,
  Play,
  Slot,
  SNOOKER,
  TEAM,
  Tennis,
  TREND,
  WALLET,
} from "../assets";
import "./index.css";
import AdminEventComponent from "./AdminEventComponent";
import { useEffect } from "react";
const AdminEventListing = ({
  selected,
  setAnchor,
  setAnchor1,
  setShow,
  show,
}) => {
  const { currentUser } = useSelector((state) => state?.currentUser);
  const currroles = useSelector((state) => state?.auth?.allRole);
  const data = [
    { id: 1, title: "Add Account", image: ADDACCOUNT, url: "add_account" },
    { id: 2, title: "Client list", image: TEAM, url: "list_of_clients" },

    { id: 3, title: "INPLAY", image: Play, url: "live_market" },

    { id: 4, title: "Analysis", image: TREND, url: "market_analysis" },
    {
      id: 5,
      title: "Reports",
      image: CHECKLIST,
      url: null,
    },

    { id: 6, title: "My Account", image: MYACCOUNT, url: null },
  ];
  let roleDetail = currroles?.find(findThisRole);
  function findThisRole(role) {
    return role?.id === currentUser?.roleId;
  }
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    if (roleDetail && roleDetail?.roleName === "fairGameWallet") {
      setNewData((prev) => {
        const secondLastIndex = prev.length - 1; // Index of the second-to-last element
        const newData = [...prev]; // Create a new array to avoid modifying the previous state directly
        const body = {
          id: 7,
          title: "wallet",
          image: WALLET,
          url: null,
        };
        if (prev?.id !== body?.id) {
          newData.splice(secondLastIndex, 0, body);
        }

        return newData;
      });
    }
  }, [roleDetail]);
  console.log("newData", newData);
  return (
    <Box
      sx={[
        {
          width: { mobile: "98%", laptop: "100%" },
          msOverflowStyle: "none",
          overflowY: "hidden",
          minHeight: { mobile: 60, laptop: 80 },
          marginLeft: { mobile: "0", laptop: ".5vw" },
          overflowX: "auto",
          alignSelf: { mobile: "center", laptop: "flex-start" },
          display: "flex",
        },
      ]}
    >
      {newData?.map((i, idx) => {
        return (
          <AdminEventComponent
            key={idx}
            data={i}
            setShow={setShow}
            selected={selected}
            setAnchor={setAnchor}
            show={show}
            setAnchor1={setAnchor1}
          />
        );
      })}
    </Box>
  );
};

export default AdminEventListing;
