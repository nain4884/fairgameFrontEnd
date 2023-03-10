import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#004A25',
      // main:"#FF8E53",
      contrastText: '#ffffff',
      mainGradient: `linear-gradient(136deg,rgba(0, 74, 37,0.8) 20%, rgba(0,0,0,0.8) 100%)`,
      cardGradient: `linear-gradient(360deg,#fde3a2 5%,#fde3a2 100% )`,
      headerGradient: `linear-gradient(90deg,#004A25 5%,#FDCB52 100% )`,
      headerGradientAdmin: `linear-gradient(50deg,#004A25 40%,#FDCB52 100% )`,
      homeBodyGradient: `linear-gradient(180deg,#004A25 5%,#1D1D1D 100% )`,
      mainGradient: `linear-gradient(1deg,rgba(0, 74, 37,0.8) 5%, rgba(0,0,0,0.8) 100%)`,
      font: "serif",
      shade1: "#fde3a2",
      shade2: "#fddc8b",
      shade3: "#FDCB52"
    },
    secondary: {
      main: '#FDF21A',
    },
    button: {
      main: "#FDF21A",
      focus: "#b1a912"
    },
    general_black: {
      main: "#000"
    },
    info: {
      main: "#0008"
    },
    text: {
      primary: '#1D1D1D',
      secondary: '#000000',
      white: "#fff",
      yellow: "#FDF21A"
    },
    headear_background: {
      main: "#FFFFFF"
    }
  },
  typography: {
    "fontFamily": `Poppins, sans-serif`,
    header: {
      color: "white",
      fontWeight: "bold"
    },
    subHeader: {
      color: "white",
    },
    inputHeader: {
      color: "white",
      fontSize: "12px"
    },
    menuListHeader: {
      color: "white",
      // fontSize: "1.3vw",
      fontWeight: "500"
    },
    menuListItem: {
      color: "white",
      // fontSize: "1vw",

    },
    eventListTitle: {
      color: "white",
      fontSize: "1.2vw",
      fontWeight: "700",
    },

  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme