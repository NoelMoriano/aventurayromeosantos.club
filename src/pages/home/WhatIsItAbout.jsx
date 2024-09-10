import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles/index.js";
import { Avatar } from "../../images/index.js";

export const WhatIsItAbout = () => {
  return (
    <Container id="what-is-it-about">
      <h1>Compra tus entradas de una manera segura y fiable</h1>

      <div className="first-section">
        <div className="item-img">
          <img src={Avatar} alt="aventura foto" />
        </div>
        <p className="description">
          Hola, soy un chico informatico que tiene a disponibilidad 6 entradas,
          con esto solo busco realizar la venta de mis entradas de una manera
          segura, la coordinación sera solo con personas serias por Google Meet
          y se concluira el mismo dia del concierto, cada vez que tenga entradas
          nuevas para conciertos esta sera mi prataforma para la venta.
        </p>
      </div>

      <div className="steps-buy">
        <ul>
          <li className="card-item">
            <div className="top-header">
              <span className="tag">Paso 1</span>
            </div>
            <p>
              Nos presentamos y nos conocemos por Google Meet para coordinar el
              proceso para la reserva e intercambiar datos.
            </p>
          </li>
          <li className="card-item">
            <div className="top-header">
              <span className="tag">Paso 2</span>
            </div>
            <p>
              Tu reserva se registrara en la base de datos y asi asegurarte con
              tus entradas.
            </p>
          </li>
          <li className="card-item">
            <div className="top-header">
              <span className="tag">Paso 3</span>
            </div>
            <p>
              La transacción del pago sera el mismo dia antes de ingresar, para
              darte la seguridad.
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
      text-align: left;
      justify-content: space-around;
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
