import { Box, Typography } from "@mui/material";
import { Input } from "../../components";
import { EyeIcon } from "../../admin/assets";
import { Background, DailogModal } from "../../components";
import { setDailogData } from "../../store/dailogModal";
import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAxios from "../../axios/adminAxios";
import Modal from "../../components/Modal";

export default function DepositWallet() {
    const navigate = useNavigate()
    const [Detail, setDetail] = useState({
        1: { field: "Previous_Balance", val: "" },
        2: { field: "amount", val: 0 },
        3: { field: "Transaction_Password", val: "" },
        4: { field: "Remark", val: "" }
    })
    const [userId, setUserId] = useState('')
    const [balance, setBalance] = useState('')
    let defaultError = {
        1: { field: "Previous_Balance", val: true },
        2: { field: "amount", val: true },
        3: { field: "Transaction_Password", val: true },
        4: { field: "Remark", val: true }
    }
    const [error, setError] = useState({
        1: { field: "Previous_Balance", val: false },
        2: { field: "amount", val: false },
        3: { field: "Transaction_Password", val: false },
        4: { field: "Remark", val: false }
    })
    const [showModalMessage, setShowModalMessage] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const handleChangeShowModalSuccess = (val) => {
        setShowSuccessModal(val)
    }
    async function getUserDetail() {
        try {
            const { data } = await adminAxios.get('users/profile');
            setUserId(data.data.id)
            setBalance(data.data.current_balance)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getUserDetail()
    }, [showSuccessModal])
    async function submit() {
        let trans_type
        if (window.location.pathname.split("/")[2] === 'deposit') {
            trans_type = 'add'
        } else {
            trans_type = window.location.pathname.split("/")[2]
        }
        const defaultDepositObj = {
            userId,
            amount: Detail[2].val,
            trans_type,
            adminTransPassword: Detail[3].val,
            remark: Detail[4].val,
        };
        try {
            const { data } = await adminAxios.post(`/fair-game-wallet/updateBalance`, defaultDepositObj);
            if (data.message === "Balance update successfully.") {
                setShowModalMessage(data.message)
                handleChangeShowModalSuccess(true)
            }
        } catch (e) {
            console.log(e);
        }
    }
    const CustomButton = ({ color, title, onClick }) => {
        return (
            <Box onClick={() => {
                onClick()
            }} sx={{ width: '45%', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: color, borderRadius: '5px', marginTop: '16px' }}>
                <Typography sx={{ color: 'white', fontSize: '14px', color: 'white', fontWeight: '600' }} >{title}</Typography>
            </Box>
        )
    }
    return (
        <>
            <Background>
                <Typography sx={{ fontSize: '16px', color: 'white', marginLeft: '0.5%', fontWeight: '600', paddingY: '0.5%', alignSelf: 'start' }}>Deposit in Wallet</Typography>
                <Box sx={{ marginLeft: "0.5%", padding: "10px", paddingBottom: "20px", display: "flex", background: "#F8C851", minHeight: "200px", maxWidth: '52vw' }}>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ flex: 1, display: "flex", border: "2px solid #FFFFFF4D", paddingLeft: "5px", height: "35px", background: "#262626", alignItems: "center" }}>
                                    <Typography sx={{ color: "white", fontSize: '12px', fontWeight: '500' }}>Main Balance</Typography>
                                </Box>
                                <Box sx={{ flex: 1, background: "#0B4F26", marginTop: "2px", display: "flex", paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D" }}>
                                    <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Previous Balance</Typography>
                                    <Typography sx={{ color: "white", fontWeight: '600' }}>{balance}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ marginLeft: "2px", flex: 1 }}>
                                <Box sx={{ flex: 1, display: "flex", paddingLeft: "5px", border: "2px solid #FFFFFF4D", height: "35px", background: "#262626", alignItems: "center" }}>
                                    <Typography sx={{ color: "white", fontSize: '12px', fontWeight: '500' }}>New Balance</Typography>
                                </Box>
                                <Box sx={{ flex: 1, background: "#0B4F26", marginTop: "2px", display: "flex", paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D" }}>
                                    <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>New Balance</Typography>
                                    <Typography sx={{ color: "#10DC61", fontWeight: '600' }}>{isNaN(Detail[2].val) ? balance : (window.location.pathname.split("/")[2] === 'withdraw' && (Detail[2].val !== 0 || isNaN(Detail[2].val))) ? (-Detail[2].val) + balance : (Detail[2].val) + balance}</Typography>
                                </Box>  {/**{(window.location.pathname.split("/")[2] === 'withdraw' && (Detail[2].val !== 0 || isNaN(Detail[2].val))) && '-'}{isNaN(Detail[2].val) ? 0 : Detail[2].val}  */}
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: "flex", paddingLeft: "5px", border: "0px solid #FFFFFF4D", height: "19px", alignItems: "center" }}>
                                </Box>
                                <Box sx={{ flex: 1, height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '10px' }}>
                                    <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: '600' }}>{(window.location.pathname.split("/")[2] + " Points").toUpperCase()}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ marginLeft: "2px", flex: 1 }}>
                                <Box sx={{ display: "flex", paddingLeft: "5px", border: "0px solid #FFFFFF4D", height: "19px", alignItems: "center" }}>
                                </Box>
                                <Box sx={{ flex: 1, marginTop: "2px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <Input
                                        placeholder="Type Amount..."
                                        titleStyle={{ display: 'none' }}
                                        inputStyle={{ paddingTop: 0, marginTop: 0, color: 'white', fontSize: '20px', fontWeight: '600' }}
                                        inputProps={{ color: 'white', padding: 0, margin: 0 }}
                                        inputContainerStyle={{ minHeight: '45px', width: '100%', background: '#0B4F26', border: '2px solid #FFFFFF4D', borderRadius: '5px', marginTop: 0 }}
                                        title={"Remark (Optional)"}
                                        setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={2}
                                        type={"Number"}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: "flex", paddingLeft: "5px", border: "0px solid #FFFFFF4D", height: "15px", alignItems: "center" }}>
                                </Box>
                                <Box sx={{ flex: 1, height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '10px' }}>
                                    <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: '600' }}>Transaction Password</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ marginLeft: "2px", flex: 1 }}>
                                <Box sx={{ display: "flex", paddingLeft: "5px", border: "0px solid #FFFFFF4D", height: "15px", alignItems: "center" }}>
                                </Box>
                                <Box sx={{ flex: 1, marginTop: "2px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <Input placeholder="Donottel"
                                        imgstyle={{ marginRight: 0 }}
                                        img={EyeIcon}
                                        titleStyle={{ display: 'none' }}
                                        inputStyle={{ paddingTop: 0, marginTop: 0, color: 'black', fontSize: '20px', fontWeight: '600' }}
                                        inputProps={{ color: 'white', padding: 0, margin: 0 }}
                                        inputContainerStyle={{ minHeight: '45px', width: '100%', background: '#FFFFFF', border: '2px solid #26262633', borderRadius: '5px', marginTop: 0 }}
                                        title={"Admin Transaction Password"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={3}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flex: .8, marginLeft: "15px" }}>
                        <Input
                            placeholder="Remark (Optional)"
                            titleStyle={{ display: 'none' }}
                            inputStyle={{ paddingTop: 0, marginTop: 0, fontWeight: '600', color: 'black' }}
                            inputProps={{ multiline: true, rows: 9, color: 'black', padding: 0, margin: 0, fontSize: '600' }}
                            inputContainerStyle={{ minHeight: '149px', width: '100%', background: '#FFECBC', border: '2px solid #26262633', borderRadius: '5px', marginTop: 0, paddingTop: '20px' }}
                            title={"Remark (Optional)"}
                            setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={4}
                        />
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <CustomButton onClick={() => {
                                navigate(`/${window.location.pathname.split("/")[1]}/list_of_clients`) //${window.location.pathname.split("/")[1]}/list_of_clients
                            }} title={'Cancel'} color={"#E32A2A"} />
                            <CustomButton onClick={() => {
                                submit()
                                // dispatch(setDailogData({ isModalOpen: true, showRight: true, bodyText: "Deposit Sucessfully" }))
                            }} title={"Submit"} color={"#0B4F26"} />
                        </Box>
                    </Box>

                </Box>
                <DailogModal />
            </Background >
            {showSuccessModal && <Modal message={showModalMessage} setShowSuccessModal={handleChangeShowModalSuccess} showSuccessModal={showSuccessModal} buttonMessage={'OK'} navigateTo={'list_of_clients'} />}
        </>
    )
}