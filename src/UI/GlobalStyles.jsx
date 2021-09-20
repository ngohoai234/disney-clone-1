import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        /* width : width + padding + border */
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
    /* nav  090b13 */
    color: white;
    background-color: #040714;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
    a {
    color: white;
    }

`;

export default GlobalStyle;
