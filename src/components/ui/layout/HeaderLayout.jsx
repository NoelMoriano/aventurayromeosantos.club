import React from "react";
import styled from "styled-components";

export const HeaderLayout = () => {
  return (
    <Container>
      <ul>
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/about-us">¿De que se trata?</a>
        </li>
        <li>
          <a href="/tickets">Entradas</a>
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
  ul {
    display: flex;
    justify-content: center;
    gap: 2em;
    list-style: none;
    font-family: "Oswald", sans-serif;
    li a {
      color: #fff;
      text-decoration: none;
    }
  }
`;
