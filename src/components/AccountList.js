import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DownGIcon,
  DownIcon,
  Excel,
  LockIcon,
  Pdf,
  UnLockIcon,
} from "../admin/assets";
import adminAxios from "../axios/adminAxios";
import SearchInput from "./SearchInput";
import StyledImage from "./StyledImage";
import UserDetailModal from "./UserDetailModal";

const SampleData = {
  message: "All users.",
  data: [
    {
      id: "9043453d-a26d-424c-bcd7-6e72a6e76697",
      userName: "fairgameAdmin1",
      fullName: "fairgameAdmin 1",
      city: "hisar haryana",
      phoneNumber: "1234567891",
      roleId: "c57d1e7d-fb45-4669-8fdc-e9e685f4e691",
      m_partnership: 0,
      sa_partnership: 0,
      a_partnership: 0,
      remark: "this is user create by fairgame walllet",
      createdBy: "2ba91fb1-4135-4d8b-8ee3-96827d0716d3",
      max_bet: null,
      min_bet: null,
      isActive: true,
      createAt: "2023-03-02T08:59:15.842Z",
      updateAt: "2023-03-03T09:57:56.669Z",
      sm_partnership: 0,
      fw_partnership: 10,
      fa_partnership: 90,
      all_blocked: 0,
      bet_blocked: 0,
      withdraw_week_day: 0,
      exposure_limit: 250,
      current_balance: 1000,
      exposure: 300,
      role: "SUPER MASTER",
    },
    {
      id: "9043453d-a26d-424c-bcd7-6e72a6e76697",
      userName: "fairgameAdmin1",
      fullName: "fairgameAdmin 1",
      city: "hisar haryana",
      phoneNumber: "1234567891",
      roleId: "c57d1e7d-fb45-4669-8fdc-e9e685f4e692",
      m_partnership: 0,
      sa_partnership: 0,
      a_partnership: 0,
      remark: "this is user create by fairgame walllet",
      createdBy: "2ba91fb1-4135-4d8b-8ee3-96827d0716d3",
      max_bet: null,
      min_bet: null,
      isActive: true,
      createAt: "2023-03-02T08:59:15.842Z",
      updateAt: "2023-03-03T09:57:56.669Z",
      sm_partnership: 0,
      fw_partnership: 10,
      fa_partnership: 90,
      all_blocked: 0,
      bet_blocked: 1,
      withdraw_week_day: 0,
      exposure_limit: 0,
      current_balance: 1000,
      exposure: 0,
      role: "MASTER",
    },
    {
      id: "9043453d-a26d-424c-bcd7-6e72a6e76697",
      userName: "fairgameAdmin1",
      fullName: "fairgameAdmin 1",
      city: "hisar haryana",
      phoneNumber: "1234567891",
      roleId: "c57d1e7d-fb45-4669-8fdc-e9e685f4e693",
      m_partnership: 0,
      sa_partnership: 0,
      a_partnership: 0,
      remark: "this is user create by fairgame walllet",
      createdBy: "2ba91fb1-4135-4d8b-8ee3-96827d0716d3",
      max_bet: null,
      min_bet: null,
      isActive: true,
      createAt: "2023-03-02T08:59:15.842Z",
      updateAt: "2023-03-03T09:57:56.669Z",
      sm_partnership: 0,
      fw_partnership: 10,
      fa_partnership: 90,
      all_blocked: 1,
      bet_blocked: 1,
      withdraw_week_day: 0,
      exposure_limit: 0,
      current_balance: 1000,
      exposure: 0,
      role: "USER",
    },
    {
      id: "6f892669-debd-4335-92d2-2348e8aa648a",
      userName: "superAdmin",
      fullName: "Super Admin",
      city: null,
      phoneNumber: "1234566790",
      roleId: "9cf210fd-e7c6-46f2-9f35-20c8ccd3d060",
      m_partnership: 0,
      sa_partnership: 90,
      a_partnership: 0,
      remark: null,
      createdBy: "6f0ac7f6-c2dc-4fb2-a133-4a74d5ddde5b",
      max_bet: null,
      min_bet: null,
      isActive: true,
      createAt: "2023-02-01T06:45:16.644Z",
      updateAt: "2023-03-02T05:55:18.420Z",
      sm_partnership: 0,
      fw_partnership: 10,
      fa_partnership: 0,
      all_blocked: 1,
      bet_blocked: 0,
      withdraw_week_day: 0,
      exposure_limit: 450,
      current_balance: 2000,
      exposure: 630,
      role: "SUPER ADMIN",
    },
  ],
};


const AccountList = () => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const [roles, setRoles] = useState([])
  const [data1, setData] = useState([]);

  async function getListOfUser() {
    try {
      const { data } = await adminAxios.get(`/fair-game-wallet/getAllUser`);
      data.data.map((element) => {
        let roleDetail = roles.find(findThisRole)
        function findThisRole(role) {
          return role.id === element.roleId
        }
        element.role = roleDetail?.roleName
      })
      setData(data.data)
    } catch (e) {
      console.log(e);
    }
  }

  async function getRoles() {
    setRoles(JSON.parse(localStorage.getItem('allRoles')))
  }

  useEffect(() => {
    getRoles();
    getListOfUser();
  }, []);

  return (
    <>
      <Box
        sx={[
          {
            marginX: "0.5%",
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
        <ListH />
        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
            <ListHeaderT />
            <ListSubHeaderT />
            {data1.map((element, i) => {
              if (i % 2 === 0) {
                return (
                  <Row
                    containerStyle={{ background: "#FFE094" }}
                    profit={true}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    element={element}
                    getListOfUser={getListOfUser}
                  />
                );
              } else {
                return (
                  <Row
                    containerStyle={{ background: "#ECECEC" }}
                    profit={false}
                    fContainerStyle={{ background: "#F8C851" }}
                    fTextStyle={{ color: "#0B4F26" }}
                    element={element}
                    getListOfUser={getListOfUser}
                  />
                );
              }
            })}
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        px: { mobile: "5px", laptop: "10px" },
        justifyContent: "space-between",
        background: "#FAFAFA",
        marginX: "0.5%",
        marginBottom: "20px",
      }}
    >
      <Typography
        sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}
      >
        Showing 1 to 50
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            height: "35px",
            width: { mobile: "80px", laptop: "100px" },
            background: "#0B4F26",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
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
            1
          </Typography>
        </Box>
        <Box
          sx={{
            height: "35px",
            width: { mobile: "80px", laptop: "100px" },
            background: "#0B4F26",
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
            Next
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ListH = () => {
  return (
    <Box
      display={"flex"}
      sx={{ justifyContent: "space-between", px: "10px", py: "6px" }}
    >
      <Box display={"flex"} alignItems="center">
        <Box
          sx={{
            background: "white",
            height: "30px",
            borderRadius: "5px",
            width: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledImage src={Excel} sx={{ height: "25px" }} />
        </Box>
        <Box
          sx={{
            background: "white",
            marginLeft: "10px",
            height: "30px",
            borderRadius: "5px",
            width: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledImage src={Pdf} sx={{ height: "25px" }} />
        </Box>
      </Box>
      <SearchInput placeholder={"Search User..."} />
    </Box>
  );
};

const ListHeaderT = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: "11.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          User Details
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Credit Referance
        </Typography>
      </Box>
      <Box
        sx={{
          width: "9.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Balance
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Client Profit/Loss
        </Typography>
      </Box>
      <Box
        sx={{
          width: "9.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Exposure
        </Typography>
      </Box>
      <Box
        sx={{
          width: "9.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Available Balance
        </Typography>
      </Box>
      <Box
        sx={{
          width: "5vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Bet Lock
        </Typography>
      </Box>
      <Box
        sx={{
          width: "5vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          User Lock
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Exposure Limit
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Account Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Casino Total
        </Typography>
      </Box>
    </Box>
  );
};

const ListSubHeaderT = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "45px",
        background: "#0B4F26",
        alignItems: "center",
        borderBottom: "2px solid white",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "11.5vw",
          display: "flex",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}></Typography>
      </Box>
      <Box
        sx={{
          width: "10.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          1,00,000,000,0
        </Typography>
      </Box>
      <Box
        sx={{
          width: "9.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          1,00,000,000,0
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11.5vw",
          display: "flex",
          paddingLeft: "10px",
          background: "#27AC1E",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          4,02,000,000,0
        </Typography>
        <StyledImage
          src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
          sx={{
            height: "15px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "9.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          1,00,000,000,0
        </Typography>
      </Box>
      <Box
        sx={{
          width: "9.5vw",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          1,00,000,000,0
        </Typography>
      </Box>
      <Box
        sx={{
          width: "5vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      ></Box>
      <Box
        sx={{
          width: "5vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      ></Box>
      <Box
        sx={{
          width: "8vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      ></Box>
      <Box
        sx={{
          width: "8vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      ></Box>
      <Box
        sx={{
          width: "8vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
        }}
      ></Box>
    </Box>
  );
};

const Row = ({
  containerStyle,
  fContainerStyle,
  fTextStyle,
  profit,
  element,
  getListOfUser
}) => {
  const dispatch = useDispatch();
  const [userModal, setUserModal] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            height: "45px",
            background: "#0B4F26",
            alignItems: "center",
            overflow: "hidden",
            borderBottom: "2px solid white",
          },
          containerStyle,
        ]}
      >
        <Box
          onClick={() => {
            !showUserModal ? setUserModal(element) : setUserModal();
            setShowUserModal(!showUserModal);
          }}
          sx={[
            {
              width: "11.5vw",
              display: "flex",
              paddingX: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            },
            fContainerStyle,
          ]}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {element.userName}
          </Typography>
          <StyledImage
            src={profit ? DownIcon : DownGIcon}
            style={{ height: "10px", width: "15px" }}
          />
        </Box>
        <Box
          sx={{
            width: "10.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            1,00,000,000,0
          </Typography>
        </Box>
        <Box
          sx={{
            width: "9.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {element.current_balance}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "11.5vw",
            display: "flex",
            paddingLeft: "10px",
            background: profit ? "#27AC1E" : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
          >
            4,02,000,000,0
          </Typography>
          <StyledImage
            src={
              profit
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            sx={{
              height: "15px",
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: "15px",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "9.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {element.exposure}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "9.5vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {element.current_balance - element.exposure}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "5vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={element.bet_blocked == 0 ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: "5vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={element.all_blocked == 0 ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: "8vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {element.exposure_limit}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "8vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {element.role}
          </Typography>{" "}
          {/** {element.role} */}
        </Box>
        <Box
          sx={{
            width: "8vw",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            0
          </Typography>
        </Box>
      </Box>
      {showUserModal && (
        <UserDetailModal
          setShowUserModal={setShowUserModal}
          backgroundColor={containerStyle?.background}
          userModal={userModal}
          getListOfUser={getListOfUser}
        />
      )}
    </>
  );
};
export default AccountList;
