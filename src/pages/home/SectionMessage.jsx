import React from "react";
import styled from "styled-components";
import { FansBg } from "../../images/index.js";
import { mediaQuery } from "../../styles/index.js";
import { Button } from "../../components/index.js";

export const SectionMessage = ({ onClickVisibleModalFansRegister }) => {
  return (
    <Container>
      <div className="content">
        <div className="center-item">
          <p>Súmate a los 1000 miles de fans de Aventura y Romeo Santos</p>
          <Button
            className="btn-secondary"
            size="large"
            onClick={onClickVisibleModalFansRegister}
          >
            Registrarme
          </Button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 22em;
  height: auto;
  padding: 2em;
  position: relative;
  overflow: hidden;
  background-blend-mode: multiply;
  background-size: cover;
  background: rgba(0, 0, 0, 0.4) url(${FansBg}) 35% 51%;
  display: grid;
  place-items: center;
  ${mediaQuery.minDesktop} {
    background: rgba(0, 0, 0, 0.3) url(${FansBg}) 69% 51%;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;
    flex-wrap: wrap;
    margin: auto;
    width: 90%;
    ${mediaQuery.minDesktop} {
      flex-wrap: nowrap;
      width: 70%;
    }
  }

  .center-item {
    font-size: 2.2em;
    text-align: center;
    p {
      text-align: center;
      position: relative;
      z-index: 500;
      ${mediaQuery.minDesktop} {
        text-align: left;
      }
    }
  }
`;
