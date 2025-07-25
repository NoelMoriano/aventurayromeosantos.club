import { css, createGlobalStyle } from "styled-components";
import { mediaQuery } from "../mediaQuery";
// import "@fontsource-variable/nunito";

const global = css`
  html {
    scroll-behavior: smooth;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #010409;
    color: #fff;
    font-family: "PT Sans", sans-serif;
    font-size: 14px;
    overflow-x: hidden;

    ${mediaQuery.minTablet} {
      font-size: 16px;
    }
  }

  .strong {
    font-weight: bold;

    &-sm {
      font-weight: 700;
    }

    &-md {
      font-weight: 800;
    }

    &-lg {
      font-weight: 900;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h1 {
    font-size: 2.7rem;
    line-height: 1;
    margin-bottom: 0.5em;
    font-weight: 800;

    ${mediaQuery.minTablet} {
      font-size: 2.9em;
    }
  }

  h2 {
    font-size: 2rem;
    line-height: 1;
    margin-bottom: 0.5em;
    font-weight: 700;

    ${mediaQuery.minTablet} {
      font-size: 2.7em;
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 0.5em;

    ${mediaQuery.minTablet} {
      font-size: 1.8rem;
    }
  }

  h4 {
    font-size: 1.2rem;
    font-weight: bold;
  }

  h5 {
    font-size: 1.1rem;
    font-weight: bold;
  }

  h5 {
    font-size: 1rem;
    font-weight: bold;
  }

  .btn-secondary {
    border: none;
    font-size: 0.6em;
    padding: 0.5em 1em;
    border-radius: 1em;
    background: #dcaf4d;
    color: #fff;
    width: auto;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`${global}`;
