import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "../axios/axios"
import Input from "./Input"
import { EyeIcon } from "../admin/assets"
import DropDownSimple from "./DropdownSimple"
import adminAxios from "../axios/adminAxios"
import expertAxios from "../axios/expertAxios"
import userAxios from '../axios/userAxios'
import masterAxios from '../axios/masterAxios'
import { useNavigate } from "react-router-dom"
import { setRole } from "./SetRole"

const containerStyles = {
    marginTop: "10px"
}

const titleStyles = { color: "#202020", fontSize: { mobile: "12px", laptop: "12px" }, fontWeight: "600", marginLeft: "0px" }
const imputStyle = { fontSize: { mobile: "14px", laptop: "14px", fontWeight: "600" } }
const inputContainerStyle = { borderRadius: "5px", border: "1px solid #DEDEDE" }
const AddAccount = () => {
    const navigate = useNavigate();
    const [loginRole, setLoginRole] = useState("")
    const [roleOfUser, setRoleOfUser] = useState("")
    const [errorShow, setErrorShow] = useState("")
    const [successShow, setSuccessShow] = useState("")
    const [Detail, setDetail] = useState({
        1: { field: "userName", val: "" },
        2: { field: "password", val: "" },
        3: { field: "confirmPassword", val: "" },
        4: { field: "fullName", val: "" },
        5: { field: "city", val: "" },
        6: { field: "phoneNumber", val: 0 },
        7: { field: "accountType", val: "" },
        8: { field: "creditReference", val: 0 },
        9: { field: "roleId", val: "" },
        10: { field: "sa_partnership", val: 0 },
        11: { field: "m_partnership", val: 0 },
        12: { field: "a_partnership", val: 0 },
        13: { field: "remark", val: "" },
        14: { field: "adminTransPassword", val: "" },
        15: { field: "myPartnership", val: 0 }
    })
    let defaultError = {
        1: { field: "userName", val: true },
        2: { field: "password", val: true },
        3: { field: "confirmPassword", val: true },
        4: { field: "fullName", val: true },
        5: { field: "city", val: true },
        6: { field: "phoneNumber", val: true },
        7: { field: "accountType", val: true },
        8: { field: "creditReference", val: true },
        9: { field: "roleId", val: true },
        10: { field: "sa_partnership", val: true },
        11: { field: "m_partnership", val: true },
        12: { field: "a_partnership", val: true },
        13: { field: "remark", val: true },
        14: { field: "adminTransPassword", val: true },
        15: { field: "myPartnership", val: true }
    }
    const [error, setError] = useState({
        1: { field: "userName", val: false },
        2: { field: "password", val: false },
        3: { field: "confirmPassword", val: false },
        4: { field: "fullName", val: false },
        5: { field: "city", val: false },
        6: { field: "phoneNumber", val: false },
        7: { field: "accountType", val: false },
        8: { field: "creditReference", val: false },
        9: { field: "roleId", val: false },
        10: { field: "sa_partnership", val: false },
        11: { field: "m_partnership", val: false },
        12: { field: "a_partnership", val: false },
        13: { field: "remark", val: false },
        14: { field: "adminTransPassword", val: false },
        15: { field: "myPartnership", val: false }
    })
    const [userAlreadyExist, setUserAlredyExist] = useState('')
    const [roles, setRoles] = useState([])

    const [typeToShow, setTypeToShow] = useState([
        "Fairgame Admin",
        "Super Admin",
        "Admin",
        "Super Master",
        "Master",
        "User"])

    const types = [
        { role: "fairGameAdmin", val: "Fairgame Admin", level: 1 },
        { role: "superAdmin", val: "Super Admin", level: 2 },
        { role: "admin", val: "Admin", level: 3 },
        { role: "superMaster", val: "Super Master", level: 4 },
        { role: "master", val: "Master", level: 5 },
        { role: "expert", val: "Expert", level: 6 },
        { role: "user", val: "User", level: 7 }
    ]

    const setRoleOnly = () => {
        let { role } = setRole()
        setRoleOfUser(role)
        setLoginRole(localStorage.getItem(role))
    }

    const setTypeForAccountType = () => {
        let typo = []
        let k = 8
        if (loginRole === "fairGameWallet") k = 0
        types.map(element => {
            if (element.role === loginRole) {
                k = element.level
            }
            if (k < element.level) {
                if (element.level === 6) {
                    if (loginRole === "fairGameAdmin") typo.push(element.val)
                } else {
                    typo.push(element.val)
                }
            }
        });
        setTypeToShow(typo)
    }

    const getAllRoles = async () => {
        let roles = []
        JSON.parse(localStorage.getItem('allRoles')).map(element => {
            roles.push({ role: element.roleName, roleId: element.id })
        });
        setRoles(roles)
    }

    const addAccount = async () => {
        let payload = {
            userName: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            city: "",
            phoneNumber: 0,
            roleId: "",
            m_partnership: 0,
            sa_partnership: 0,
            a_partnership: 0,
            remark: "",
            adminTransPassword: "",
            myPartnership: 0
        }
        try {
            function checkRoleId(age) {
                return age.role.split(" ").join("").toLowerCase() === Detail[9].val.split(" ").join("").toLowerCase();
            }
            if (!(Detail[2].val === 0 || Detail[2].val === "" || Detail[3].val === 0 || Detail[3].val === "" || Detail[9].val === 0 || Detail[9].val === "" || Detail[14].val === 0 || Detail[14].val === "")) {
                payload = {
                    ...payload,
                    userName: Detail[1].val,
                    password: Detail[2].val,
                    confirmPassword: Detail[3].val,
                    fullName: Detail[4].val,
                    city: Detail[5].val,
                    phoneNumber: Detail[6].val,
                    roleId: roles.filter(checkRoleId)[0].roleId,
                    sa_partnership: Detail[10].val,
                    m_partnership: Detail[11].val,
                    a_partnership: Detail[12].val,
                    remark: Detail[13].val,
                    adminTransPassword: Detail[14].val,
                    myPartnership: Detail[15].val
                }
                let response
                switch (roleOfUser) {
                    case 'role1':
                        response = await masterAxios.post(`/fair-game-wallet/adduser`, payload);
                        break;
                    case 'role2':
                        response = await adminAxios.post(`/fair-game-wallet/adduser`, payload);
                        break;
                    case 'role3':
                        response = await expertAxios.post(`/fair-game-wallet/adduser`, payload);
                        break;
                    default:
                        response = await userAxios.post(`/fair-game-wallet/adduser`, payload);
                        break;
                }
                const { data } = response
                setSuccessShow(data.message)
            }
        } catch (e) {
            console.log(e)
            setErrorShow(e.response.data.message)
        }
    }

    const setDownParterShipVal = (val1, val2) => {
        let val3 = 100 - val1 - val2
        setDetail({
            ...Detail, [12]: {
                ...Detail[12],
                val: parseInt(val3)
            }
        })
    }

    useEffect(() => {
        getAllRoles()
        setRoleOnly()
        setTypeForAccountType()
    }, [loginRole, Detail, error])

    useEffect(()=>{
        checkUserName(Detail[1].val)
    },[Detail[1].val])

    async function checkUserName(val) {
        try{
            let body = {
                userName: val
            }
            const {data} = await adminAxios.post(`fair-game-wallet/checkUserExist`, body)
            console.log(data.data.exist)
            if(data.data.exist === true) {
                setError({...error,[1]:{
                    ...error[1],
                    val: true
                }})
                setUserAlredyExist('User Already Exist With This Name')
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        setDownParterShipVal(Detail[10].val, Detail[11].val)
        // console.log(Detail[12].val)
    }, [Detail[10].val, Detail[11].val])

    return (
        <Box sx={{ paddingY: "20px", paddingTop: "10px", marginX: "1%" }}>
            <Typography sx={{ color: "white", fontSize: "18px", fontWeight: "600" }}>Add Account</Typography>
            <Box sx={{ background: "#F8C851", minHeight: "60vh", borderRadius: "5px", padding: "20px", paddingTop: "10px", marginTop: "10px", display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                    <Input placeholder="Username" titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"Username"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={1} />
                    {error[1].val && <p style={{ color: "#fa1e1e" }}>{userAlreadyExist?userAlreadyExist:'Field Required'}</p>}
                    <Input containerStyle={containerStyles} img={EyeIcon} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"User Password*"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={2} />
                    {error[2].val && <p style={{ color: "#fa1e1e" }}>{error[2].val}</p>}
                    <Input containerStyle={containerStyles} img={EyeIcon} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"Confirm User Password*"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={3} />
                    {Detail[2].val !== Detail[3].val && <p style={{ color: "#fa1e1e" }}>Password Doesn't Match</p>}
                    <Input placeholder="John Doe" containerStyle={containerStyles} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"Fullname"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={4} />
                    <Input placeholder="Delhi" containerStyle={containerStyles} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"City"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={5} />
                    <Input placeholder="+0 123 456 7890" containerStyle={containerStyles} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"Mobile Number"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={6} type={"Number"} />
                </Box>
                <Box sx={{ flex: 1, marginX: "20px" }}>
                    <DropDownSimple valued="Select Account Type..." dropStyle={{ filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);" }} valueStyle={{ ...imputStyle, color: "white" }} title={'Account Type'} valueContainerStyle={{ height: "45px", marginX: "0px", background: "#0B4F26", border: "1px solid #DEDEDE", borderRadius: "5px" }} containerStyle={{ width: "100%", position: 'relative', marginTop: "5px" }} titleStyle={{ marginLeft: "0px" }} data={typeToShow} dropDownStyle={{ width: '100%', marginLeft: "0px", marginTop: "0px", position: 'absolute' }} dropDownTextStyle={imputStyle} Detail={Detail} setDetail={setDetail} place={9} />
                    {error[9].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
                    <Input containerStyle={containerStyles} placeholder="1,000,000,000" titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"Credit Reference"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={8} type={"Number"} />
                    {error[9].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
                    <Input containerStyle={containerStyles} placeholder="10%" titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={{ ...inputContainerStyle, backgroundColor: "#DEDEDE" }} title={"Upline Partnership"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={10} type={"Number"} />
                    {error[10].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
                    <Input placeholder="12%" containerStyle={containerStyles} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"My Partnership"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={11} type={"Number"} />
                    {error[11].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
                    <Input placeholder="78%" containerStyle={containerStyles} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={{ backgroundColor: "#DEDEDE", ...inputContainerStyle }} title={"Downline partnership"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={12} type={"Number"} typeOfRead={false} autoMaticFillValue={Detail[12].val} />
                    {error[12].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
                </Box>
                <Box sx={{ flex: 1.5 }}>
                    <Input
                        placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
                        titleStyle={titleStyles} inputStyle={imputStyle} inputProps={{ multiline: true, rows: 10 }} inputContainerStyle={{ ...inputContainerStyle, height: { laptop: "205px", mobile: "205px" }, width: '50%' }} title={"Remark"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={13} />
                    <Input placeholder="Donottel" containerStyle={{ ...containerStyles, width: "50%" }} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={{ ...inputContainerStyle }} title={"Admin Transaction Password"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={14} />
                    {error[14].val && <div style={{ width: "50%" }}> <p style={{ color: "#fa1e1e" }}>{error[14].val}</p> </div>}
                    <Button className="cursor-pointer" sx={{ background: "#0B4F26", width: "50%", display: "flex", justifyContent: "center", border: "2px solid black", alignItems: "center", borderRadius: "5px", height: "45px", marginTop: "35px", color: "white", fontSize: "18px" }} onClick={(e) => { addAccount() }}>Create</Button>
                    {errorShow && !successShow && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
                    {successShow && <p style={{ color: "#0B4F26" }}>{successShow}</p>}
                    {errorShow === "User need to first create the transaction password." && <Button className="cursor-pointer" sx={{ background: "#0B4F26", width: "50%", display: "flex", justifyContent: "center", border: "2px solid black", alignItems: "center", borderRadius: "5px", height: "45px", marginTop: "35px", color: "white", fontSize: "18px" }} onClick={(e) => {
                        navigate(`/${window.location.pathname.split("/")[1]}/createTransPassword`);
                    }}>Create Trans Password</Button>}
                </Box>
            </Box>
        </Box>
    )
}

export default AddAccount