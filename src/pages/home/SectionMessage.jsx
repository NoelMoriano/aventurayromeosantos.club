import React from "react";
import styled from "styled-components";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { TeleticketBlanco } from "../../images/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SectionMessage = () => {
  return (
    <Container>
      <div className="left-item">
        <p>
          Solo son 6 entradas disponibles a la venta, no te quedes sin el tuyo
        </p>
      </div>
      <div className="right-item">
        <p>Entradas 100% legitiamas de</p>
        <img src={TeleticketBlanco} alt="aventura entradas" />
        <FontAwesomeIcon icon={faTicket} size="lg" className="icon" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  overflow: hidden;
  gap: 2em;
  flex-wrap: wrap;

  .left-item {
    font-size: 2em;
    text-align: center;

    p {
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
