import React from "react";
import styled from "styled-components";
import { LogoFooter } from "../../../images";
import { mediaQuery } from "../../../styles";

export const FooterLayout = () => {
  return (
    <Container>
      <div className="logo">
        <img src={LogoFooter} alt="footer logo" />
      </div>
      <div className="footer-bottom">
        <p>
          Desarrollado por{" "}
          <a href="https://www.linkedin.com/in/nmoriano/" target="_blank">
            {"<ELLEONDEV/>"} Noel Moriano
          </a>
        </p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  font-size: 0.8em;
  text-align: center;

  .logo {
    padding: 1em;

    img {
      width: 100%;
      height: auto;

      ${mediaQuery.minTablet} {
        width: 43em;
      }
    }
  }

  .description {
    width: 90%;
    margin: auto;
    padding: 1.5em 1em;

    ${mediaQuery.minDesktop} {
      width: 70%;
    }

    .marks-list {
      margin: 0;
      padding: 0;
      list-style: none;
      text-align: justify;

      li {
        line-height: 1.333333;
        margin-bottom: 0.5em;
        font-weight: 100;
      }
    }
  }

  .footer-bottom {
    background: #070a0e;
    padding: 1em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;

    ${mediaQuery.minTablet} {
      padding: 1em 3em;
      justify-content: space-between;
    }

    p:first-child {
      display: grid;
      gap: 0.4em;
      font-size: 0.9em;
      text-align: center;

      ${mediaQuery.minTablet} {
        text-align: left;
      }
    }

    a {
      color: #fff;
    }
  }
`;
