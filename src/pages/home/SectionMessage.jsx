import React from "react";
import styled from "styled-components";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { TeleticketBlanco } from "../../images/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mediaQuery } from "../../styles/index.js";

export const SectionMessage = () => {
  return (
    <Container>
      <div className="content">
        <div className="left-item">
          <p>
            Son solo 6 entradas disponibles a la venta, no te pierdas el último
            concierto de aventura
          </p>
        </div>
        <div className="right-item">
          <p>Entradas 100% legítimas de</p>
          <img src={TeleticketBlanco} alt="aventura entradas" />
          <FontAwesomeIcon icon={faTicket} size="lg" className="icon" />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 2em;
  position: relative;
  overflow: hidden;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 2em;
    flex-wrap: wrap;
    margin: auto;
    width: 90%;
    ${mediaQuery.minDesktop} {
      flex-wrap: nowrap;
      width: 70%;
    }
  }

  .left-item {
    font-size: 2em;

    p {
      text-align: left;
      position: relative;
      z-index: 500;
    }
  }

  .right-item {
    position: relative;
    .icon {
      font-size: 10em;
      transform: rotate(140deg);
      position: absolute;
      top: -12px;
      left: 40%;
      color: #875f32e8;
    }
    p,
    img {
      position: relative;
      z-index: 500;
      width: 17em;
      height: auto;
    }
  }
`;
