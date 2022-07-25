import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
        font-family: Avenir, Arial, sans-serif;
    }

    html {
        background-color: ${theme.palette.common.black};
        color: ${theme.palette.common.white};
    }

    * {
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }

    fieldset {
        border: 0;
    }

    button {
        background-color: transparent;
        border: none;
        appearance: none;
        font: inherit;
    }

    strong {
        font-weight: 900;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    li {
        list-style: none;
    }
`;

export default GlobalStyle;
