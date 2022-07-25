import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 479,
      sm: 767,
      md: 1023,
      lg: 1279,
      xl: 1280,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
