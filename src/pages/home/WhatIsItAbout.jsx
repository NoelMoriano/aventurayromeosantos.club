import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles/index.js";
import { Avatar } from "../../images/index.js";

export const WhatIsItAbout = () => {
  return (
    <Container id="what-is-it-about">
      <h2>Adquiere tu entrada de una manera segura, comprobada y fiable</h2>

      <div className="first-section">
        <div className="item-img">
          <img src={Avatar} alt="aventura foto" />
        </div>
        <p className="description">
          ¡Hola! Soy Noel Moriano, un profesional del desarrollo web. Tengo 6
          entradas disponibles para el concierto y busco venderlas de manera
          segura y fiable. La coordinación se realizará únicamente con personas
          serias a través de Google Meet y completaremos la transacción él mismo
          día del evento. Cada vez que tenga nuevas entradas, esta será mi
          plataforma de ventas.
        </p>
      </div>

      <div className="steps-buy">
        <ul>
          <li className="card-item">
            <div className="top-header">
              <span className="tag">Paso 1</span>
            </div>
            <p>
              Regístrate y nos reuniremos por Google Meet, además te mostraré mi
              cuenta en teleticket para probar su legitimidad.
            </p>
          </li>
          <li className="card-item">
            <div className="top-header">
              <span className="tag">Paso 2</span>
            </div>
            <p>
              Tu reserva se registrará y así asegurarás tu entrada para él
              concierto.
            </p>
          </li>
          <li className="card-item">
            <div className="top-header">
              <span className="tag">Paso 3</span>
            </div>
            <p>
              La transacción del pago será el mismo día antes de ingresar, para
              darte la seguridad.
              <br />
              <small>* No se acepta efectivo</small>
            </p>
          </li>
        </ul>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: rgb(255 255 255 / 96%);
  color: #000;
  padding: 5em 1em;
  text-align: center;

  .first-section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 90%;
    gap: 1.5em;
    margin: 1em auto;
    ${mediaQuery.minDesktop} {
      display: flex;
      text-align: left;
      justify-content: space-around;
      flex-wrap: nowrap;
      width: 50%;
    }
    .item-img {
      img {
        border-radius: 50%;
        width: 7em;
        height: 7em;
      }
    }
    .description {
      font-size: 1.1em;
    }
  }

  .steps-buy {
    ul {
      list-style: none;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.2em;

      .card-item {
        padding: 1em;
        background: #fff;
        border-radius: 1.3em;
        display: flex;
        flex-direction: column;
        gap: 1em;
        max-width: 25em;

        .top-header {
          display: flex;
          justify-content: center;

          .tag {
            background: #ffca5e;
            border-radius: 0.4em;
            padding: 0.2em 0.5em;
            font-weight: 600;
            font-size: 1.1em;
          }
        }

        p {
          font-size: 1.2em;
        }
      }
    }
  }
`;
