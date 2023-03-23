import * as React from 'react';
import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { TransPassComp } from '../pages/matches/TransPasswordComponent';
import { Button, Typography } from '@mui/material';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   backgroundColor: '#000',
//   border: '2px solid #000',
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };

// function ChildModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button onClick={handleOpen}>Open Child Modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style, width: 200 }}>
//           <h2 id="child-modal-title">Text in a child modal</h2>
//           <p id="child-modal-description">
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//           </p>
//           <Button onClick={handleClose}>Close Child Modal</Button>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

// export default function NestedModal(props) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button onClick={handleOpen} sx={{ backgroundColor: '#fff' }}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box sx={{ ...style, width: 400 }} mx={{ ...style, width: 700 }}>
//           <h2 id="parent-modal-title " >{props.message}</h2>
//           <h4 id="parent-modal-description">
//             {props.buttonMessage}
//           </h4>
//           <ChildModal />
//           <Typography
//             sx={{
//               color: "white",
//               fontSize: { laptop: "18px", mobile: "20px" },
//               fontWeight: "700",
//             }}
//           >
//             Create Transaction Password
//           </Typography>
//           <Box
//             sx={{
//               width: "100%",
//               minHeight: "200px",
//               background: "#F8C851",
//               borderRadius: "5px",
//               padding: "20px",
//               marginTop: "10px",
//             }}
//           >
//             <Input
//               placeholder={"Enter Password"}
//               inputProps={{ type: "password" }}
//               title={"Transaction Password"}
//               titleStyle={{
//                 color: "#222222",
//                 marginLeft: "0px",
//                 fontWeight: "600",
//               }}
//               inputContainerStyle={{ borderRadius: "5px" }}
//               containerStyle={{}}
//               img={eye}
//             // setDetail={setPasswordDetail} Detail={passwordDetail} setError={setError} error={error} place={1}
//             />
//             {/* {error[1].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>} */}
//             <Input
//               placeholder={"Enter Confirm Password"}
//               inputProps={{ type: "password" }}
//               title={"Confirm Transaction Password"}
//               titleStyle={{
//                 color: "#222222",
//                 marginLeft: "0px",
//                 fontWeight: "600",
//               }}
//               inputContainerStyle={{ borderRadius: "5px" }}
//               containerStyle={{ marginTop: "30px" }}
//             // img={eye}
//             // setDetail={setPasswordDetail} Detail={passwordDetail} setError={setError} error={error} place={2}
//             />
//             {/* {error[2].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>} */}
//             <Box
//               sx={{
//                 height: "50px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 mx: "auto",
//                 marginTop: "60px",
//                 marginBottom: "40px",
//                 width: "80%",
//                 background: "#0B4F26",
//                 borderRadius: "5px",
//               }}
//             >
//               <Typography
//                 sx={{ fontSize: { laptop: "18px", mobile: "20px" } }}
//                 color={"white"}
//                 onClick={() => {
//                   // generateTrandPassword()
//                 }}
//               >
//                 Generate Password
//               </Typography>
//             </Box>
//             {/* {responseError && <p style={{ color: "#fa1e1e" }}>{responseError}</p>} */}
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

export function ThisUseModal() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open && <Box p={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, backgroundColor: '#00000069', borderRadius: '15px', height: '100vh', width: '100vw' }}>
        <Box p={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #707070', backgroundColor: '#000', borderRadius: '15px' }}>
          <Button sx={{ color: '#fff' }} onClick={handleClose}>&times;</Button>
          <TransPassComp />
        </Box>
      </Box>}
    </>
  )
}

export function Modal({ message, buttonMessage, navigateTo }) {
  const navigate = useNavigate()
  return (
    <>
      <Box p={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #707070', backgroundColor: '#000', borderRadius: '15px' }}>
        <Typography mb={2} color={'#fff'}>{message}</Typography>
        <Button sx={{ backgroundColor: '#fff', ':hover': { backgroundColor: '#43ff5f' } }} onClick={() => { navigate(`/${window.location.pathname.split("/")[1]}/${navigateTo}`) }}>{buttonMessage}</Button>
      </Box>
    </>
  )
}

export default Modal
