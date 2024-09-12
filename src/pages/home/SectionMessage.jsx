import React from "react";
import styled from "styled-components";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { MyPhotoPortada2, TeleticketBlanco } from "../../images/index.js";
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
  min-height: 17em;
  height: auto;
  padding: 2em;
  position: relative;
  overflow: hidden;
  background-blend-mode: multiply;
  background-size: cover;
  background: rgba(0, 0, 0, 0.8) url(${MyPhotoPortada2}) 35% 51%;
  display: grid;
  place-items: center;
  ${mediaQuery.minDesktop} {
    background: rgba(0, 0, 0, 0.8) url(${MyPhotoPortada2}) 69% 51%;
  }

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
      text-align: center;
      position: relative;
      z-index: 500;
      ${mediaQuery.minDesktop} {
        text-align: left;
      }
    }
  }

  .right-item {
    position: relative;
    margin: 0 0 auto 0;

    .icon {
      font-size: 12em;
      transform: rotate(140deg);
      position: absolute;
      top: -2rem;
      left: 10%;
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
