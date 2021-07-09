import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffac33",
      main: "#ff9800",
      dark: "#b26a00",
      contrastText: "#121212",
    },
    secondary: {
      light: "#834bff",
      main: "#651fff",
      dark: "#4615b2",
      contrastText: "#fff",
    },
  },
});

export default theme;
