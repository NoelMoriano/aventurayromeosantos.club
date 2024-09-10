import React from "react";
import styled from "styled-components";
import { LogoFooter } from "../../../images/index.js";
import { mediaQuery } from "../../../styles/index.js";

export const FooterLayout = () => {
  return (
    <Container>
      <div className="logo">
        <img src={LogoFooter} alt="footer logo" />
      </div>
      <div className="description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi at
        consequatur consequuntur eum ex excepturi illum, itaque laboriosam
        laudantium magnam molestias porro reiciendis suscipit tempora, tenetur
        vel velit vitae.
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 1.5em 1em;
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
    ${mediaQuery.minDesktop} {
      width: 70%;
    }
  }
`;
