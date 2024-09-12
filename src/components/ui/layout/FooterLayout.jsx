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
      <div className="description">
        <ul className="marks-list">
          <li>
            <span className="marker">*</span>
            <span className="list-text">
              <b>Público recomendado:</b> Adultos.
            </span>
          </li>

          <li>
            <span className="marker">*</span>
            <span className="list-text">
              Ingresan a partir de los 5 años, acompañados de un adulto
              responsable de su seguridad, cada uno con su entrada en el mismo
              sector.
            </span>
          </li>

          <li>
            <span className="marker">*</span>
            <span className="list-text">
              <b>Día del concierto:</b> Miércoles 16 y jueves 17 de octubre del
              2024.
            </span>
          </li>

          <li>
            <span className="marker">*</span>
            <span className="list-text">
              <b>Evento puede iniciar desde las:</b> 09:00 p.m.
            </span>
          </li>

          <li>
            <span className="marker">*</span>
            <span className="list-text">
              <b>Duración aproximada del evento:</b> 2 Horas.
            </span>
          </li>

          <li>
            <span className="marker">*</span>
            <span className="list-text">
              <b>Capacidad Total del evento:</b>
              PLATINUM CENTRAL (5,500), PLATINUM LATERAL (1,500), VIP (8,000),
              GENERAL (4,000), TRIBUNA OCCIDENTE 1 (3,160), TRIBUNA OCCIDENTE 2
              (2,498), TRIBUNA ORIENTE 1 (3,586), TRIBUNA ORIENTE 2 (2,720) y
              TRIBUNA NORTE (11,000).
            </span>
          </li>

          <li>
            <span className="marker">*</span>
            <span className="list-text">
              <b>Recinto:</b> ESTADIO NACIONAL - José Diaz S/N.
            </span>
          </li>

          <li>
            <span className="marker">*</span>
            <span className="list-text">
              Deberán presentar su ticket o e-ticket para el ingreso. Todos los
              boletos serán escaneados al ingreso por medio de dispositivos
              digitales. En caso que el ticket o e-ticket esté roto, en mal
              estado o con indicios de falsificación, la producción u
              organizador podrán NO AUTORIZAR la entrada al recinto.
            </span>
          </li>

          <li>
            <span className="marker">*</span>
            <span className="list-text">
              Precios de los tickets incluyen comisión de ticketera.
            </span>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          <span>
            Esta pagina esta excluida de teletickets, fue creada solo para la
            reventa de mis entradas
          </span>{" "}
          <span>Valida solo para Perú 🇵🇪</span>
        </p>
        <p>
          Desarrollado por{" "}
          <a href="https://www.linkedin.com/in/nmoriano/" target="_blank">
            Noel Moriano {"<NDev/>"}
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
