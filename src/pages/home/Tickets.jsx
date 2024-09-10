import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles";
import { CardTicket } from "./CardTicket";

export const Tickets = () => {
  return (
    <Container id="tickets">
      <h2>Entradas (Tickets)</h2>
      <p className="description">
        Recordar que solo son 6 entradas disponibles, 3 VIPS y 3 Generales con
        distintas fechas.
      </p>

      <div className="tickets-items">
        <ul className="card-lists">
          <CardTicket />
          {/*<li className="card-item">*/}
          {/*  <div className="header">*/}
          {/*    <div className="title">VIP</div>*/}
          {/*    <div className="color-type"></div>*/}
          {/*    <div className="concert">AVENTURA EN LIMA</div>*/}
          {/*    <div className="date">16/10/2024</div>*/}
          {/*    <div className="place">Estadio Nacional</div>*/}
          {/*  </div>*/}
          {/*  <div className="body">*/}
          {/*    <button className="btn-reserve-ticket">Reservar</button>*/}
          {/*    <div className="users-list">*/}
          {/*      <div className="title">Lista en espera para reunion</div>*/}
          {/*      <ul className="list">*/}
          {/*        <li>*/}
          {/*          <div className="name">Noel moriano</div>*/}
          {/*          <div className="status">*/}
          {/*            <span className="item">Pendiente</span>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          <div className="name">Noel moriano</div>*/}
          {/*          <div className="status">*/}
          {/*            <span className="item">Pendiente</span>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          <div className="name">Noel moriano</div>*/}
          {/*          <div className="status">*/}
          {/*            <span className="item">Pendiente</span>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</li>*/}
          {/*<li className="card-item">*/}
          {/*  <div className="header">*/}
          {/*    <div className="title">VIP</div>*/}
          {/*    <div className="color-type"></div>*/}
          {/*    <div className="concert">AVENTURA EN LIMA</div>*/}
          {/*    <div className="date">17/10/2024</div>*/}
          {/*    <div className="place">Estadio Nacional</div>*/}
          {/*  </div>*/}
          {/*  <div className="body">*/}
          {/*    <button className="btn-reserve-ticket">Reservar</button>*/}
          {/*    <div className="users-list">*/}
          {/*      <div className="title">Lista en espera para reunion</div>*/}
          {/*      <ul className="list">*/}
          {/*        <li>*/}
          {/*          <div className="name">Noel moriano</div>*/}
          {/*          <div className="status">*/}
          {/*            <span className="item">Pendiente</span>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          <div className="name">Noel moriano</div>*/}
          {/*          <div className="status">*/}
          {/*            <span className="item">Pendiente</span>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          <div className="name">Noel moriano</div>*/}
          {/*          <div className="status">*/}
          {/*            <span className="item">Pendiente</span>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</li>*/}
          {/*<li className="card-item">*/}
          {/*  <div className="header">*/}
          {/*    <div className="title">GENERAL</div>*/}
          {/*    <div className="color-type"></div>*/}
          {/*    <div className="concert">AVENTURA EN LIMA</div>*/}
          {/*    <div className="date">17/10/2024</div>*/}
          {/*    <div className="place">Estadio Nacional</div>*/}
          {/*  </div>*/}
          {/*  <div className="body">*/}
          {/*    <button className="btn-reserve-ticket">Reservar</button>*/}
          {/*    <div className="users-list">*/}
          {/*      <div className="title">Lista en espera para reunion</div>*/}
          {/*      <ul className="list">*/}
          {/*        <li>*/}
          {/*          <div className="name">Noel moriano</div>*/}
          {/*          <div className="status">*/}
          {/*            <span className="item">Pendiente</span>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          <div className="name">Noel moriano</div>*/}
          {/*          <div className="status">*/}
          {/*            <span className="item">Pendiente</span>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          <div className="name">Noel moriano</div>*/}
          {/*          <div className="status">*/}
          {/*            <span className="item">Pendiente</span>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</li>*/}
        </ul>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
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

  .tickets-items {
    .card-lists {
      list-style: none;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5em;
    }
  }
`;
