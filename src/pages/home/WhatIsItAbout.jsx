import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles/index.js";

export const WhatIsItAbout = () => {
  return (
    <Container id="what-is-it-about">
      <h1>Compra tus entradas de manera segura</h1>

      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
        consequuntur culpa eius hic illum inventore laboriosam modi nihil non
        odit officiis quis, quisquam, repellendus tenetur totam veritatis
        voluptas! Culpa, perferendis?
      </p>

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

  .description {
    width: 90%;
    margin: auto auto 3em auto;
    font-size: 1.1em;

    ${mediaQuery.minDesktop} {
      width: 80%;
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
            background: #bbdefd;
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
