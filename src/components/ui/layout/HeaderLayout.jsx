import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../../styles";

export const HeaderLayout = () => {
  return (
    <Container>
      <ul id="home">
        <li>
          <a href="#home">Inicio</a>
        </li>
        <li>
          <a href="#what-is-it-about">¿De que se trata?</a>
        </li>
        <li>
          <a href="#tickets">Entradas</a>
        </li>
      </ul>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1em;
  z-index: 500;
  ul {
    display: flex;
    justify-content: center;
    gap: 2em;
    list-style: none;
    font-family: "Oswald", sans-serif;
    font-size: 1em;
    ${mediaQuery.minTablet} {
      font-size: 1.1em;
    }
    li a {
      color: #fff;
      text-decoration: none;
      cursor: pointer;
    }
  }
`;
