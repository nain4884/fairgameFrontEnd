import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  DownGIcon,
  DownIcon,
  Excel,
  LockIcon,
  Pdf,
  UnLockIcon,
} from "../admin/assets";
import Modal from "./Modal";
import SearchInput from "./SearchInput";
import { setRole } from "./SetRole";
import StyledImage from "./StyledImage";
import UserDetailModal from "./UserDetailModal";

const AccountList = () => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const [roles, setRoles] = useState([])
  const [data1, setData] = useState([]);
  async function getListOfUser() {
    try {
      let { axios } = setRole()
      const { data } = await axios.get(`/fair-game-wallet/getAllUser?&page=${currentPage}&limit=${pageLimit}`);
      data?.data?.data.map((element) => {
        let roleDetail = roles.find(findThisRole)
        function findThisRole(role) {
          return role.id === element.roleId
        }
        element.role = roleDetail?.roleName
      })
      setData(data?.data?.data)
      setPageCount(Math.ceil(parseInt(data?.data?.totalCount ? data.data?.totalCount : 1) / pageLimit));
    } catch (e) {
      console.log(e);
    }
  }

  const [pageCount, setPageCount] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(5)

  function callPage(val) {
    setCurrentPage(parseInt(val))
  }

  async function getRoles() {
    setRoles(JSON.parse(localStorage.getItem('allRoles')))
  }

  useEffect(() => {
    getRoles();
    getListOfUser();
  }, [currentPage, pageCount]);

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
            <ListSubHeaderT data={data1} />
            {data1.map((element, i) => {
              if (i % 2 === 0) {
                return (
                  <Row
                    containerStyle={{ background: "#FFE094" }}
                    profit={element.profit_loss >= 0}
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
                    profit={element.profit_loss >= 0}
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
      <Footer currentPage={currentPage} pages={pageCount} callPage={callPage} />
    </>
  );
};

const Footer = ({ currentPage, pages, callPage }) => {
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
        Showing 1 to {pages}
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
          onClick={() => {
            callPage(parseInt(currentPage) - 1 === 0 ? 1 : parseInt(currentPage) - 1)
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
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            callPage(parseInt(currentPage) === pages ? pages : parseInt(currentPage) + 1)
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

const ListSubHeaderT = ({ data }) => {
  const defaultSumVal = {
    Credit_Referance: 0,
    Balance: 0,
    Profit_Loss: 0,
    Exposure: 0,
    Available_Balance: 0,
    Exposure_Limit: 0,
    Casino_Total: 0
  }
  const [sumVal, setSumVal] = useState({})
  useEffect(() => {
    handleDefaultSumVal()
    updateDataValue()
  }, [data])
  function handleDefaultSumVal() {
    setSumVal(defaultSumVal)
  }
  function updateDataValue() {
    let Credit_Referance = 0
    let Balance = 0
    let Profit_Loss = 0
    let Exposure = 0
    let Available_Balance = 0
    let Exposure_Limit = 0
    let Casino_Total = 0
    data.map(element => {
      Credit_Referance += isNaN(parseInt(element.credit_refer)) ? 0 : parseInt(element.credit_refer)
      Balance += isNaN(parseInt(element.balance)) ? 0 : parseInt(element.balance)
      Profit_Loss += isNaN(parseInt(element.profit_loss)) ? 0 : parseInt(element.profit_loss)
      Exposure += isNaN(parseInt(element.exposure)) ? 0 : parseInt(element.exposure)
      Available_Balance += isNaN(parseInt(element.available_balance)) ? 0 : parseInt(element.available_balance)
      Exposure_Limit += isNaN(parseInt(element.exposure_limit)) ? 0 : parseInt(element.exposure_limit)
    });
    setSumVal({ ...sumVal, Credit_Referance, Balance, Profit_Loss, Exposure, Available_Balance, Exposure_Limit })
  }
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
          {sumVal.Credit_Referance}
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
          {sumVal.Balance}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11.5vw",
          display: "flex",
          paddingLeft: "10px",
          background: `${sumVal.Profit_Loss >= 0 ? '#27AC1E' : '#E32A2A'}`,
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      > {/* element.profit_loss >= 0 ? '#27AC1E' : '#E32A2A'*/}
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {sumVal.Profit_Loss}
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
          {sumVal.Exposure}
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
          {sumVal.Available_Balance}
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
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {sumVal.Exposure_Limit}
        </Typography>
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
      ></Box>
      <Box
        sx={{
          width: "8vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {sumVal.Casino_Total}
        </Typography>
      </Box>
    </Box>
  );
};

const Row = ({
  containerStyle,
  fContainerStyle,
  fTextStyle,
  profit,
  element,
  getListOfUser,
}) => {
  const [userModal, setUserModal] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  useEffect(() => {
    getListOfUser()
  }, [showSuccessModal])
  const handleChangeShowModalSuccess = (val) => {
    setShowSuccessModal(val)
  }
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
            src={DownIcon}
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
            {element.credit_refer}
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
            {element.balance}
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
            {element.profit_loss}
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
            {element.available_balance}
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
          setShowSuccessModal={handleChangeShowModalSuccess}
          setShowModalMessage={setShowModalMessage}
          profitLoss={element.profit_loss}
        />
      )}
      {showSuccessModal && <Modal message={showModalMessage} setShowSuccessModal={handleChangeShowModalSuccess} showSuccessModal={showSuccessModal} buttonMessage={'OK'} navigateTo={'list_of_clients'} />}
    </>
  );
};
export default AccountList;
