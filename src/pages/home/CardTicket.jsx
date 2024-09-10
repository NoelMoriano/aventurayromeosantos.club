import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles";

export const CardTicket = ({ ticket }) => {
  return (
    <Container>
      <div className="header">
        <div className="title">VIP</div>
        <div className="color-type" />
        <div className="concert">
          <div>AVENTURA EN LIMA</div>
          <div className="date">16/10/2024</div>
        </div>

        <div className="place-and-amount">
          <div className="place">Estadio Nacional</div>
          <div className="amount">Cantidad: 2</div>
        </div>
      </div>
      <div className="body">
        <button className="btn-reserve-ticket">Reservar</button>
        <div className="users-list">
          <div className="title">Lista en espera para reunion</div>
          <ul className="list">
            <li>
              <div className="name">Noel moriano</div>
              <div className="status">
                <span className="item">Pendiente</span>
              </div>
            </li>
            <li>
              <div className="name">Noel moriano</div>
              <div className="status">
                <span className="item">Pendiente</span>
              </div>
            </li>
            <li>
              <div className="name">Noel moriano</div>
              <div className="status">
                <span className="item">Pendiente</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  border-radius: 1.3em;
  background: #fff;
  color: #fff;
  border: 1px solid #eee;
  ${mediaQuery.minDesktop} {
    width: calc(80% / 3);
  }

  .top-header {
    display: flex;
    justify-content: center;
  }

  .header {
    text-align: center;
    text-transform: uppercase;
    font-weight: 800;
    color: #000;
    border-bottom: 1px solid #eee;

    div {
      font-size: 0.9em;
      font-weight: 600;
      padding: 0.3em 1em;
    }

    .title {
      font-size: 1.7em;
      font-weight: 800;
      padding: 0.5em 1em;
    }

    .color-type {
      width: 100%;
      height: 0.5em;
      background: #deae01;
    }
    .concert,
    .place-and-amount {
      display: flex;
      justify-content: space-between;
      gap: 1em;
    }
  }

  .body {
    padding: 0 1em 1em 1em;
    .btn-reserve-ticket {
      border: none;
      font-size: 1.2em;
      padding: 0.5em 1em;
      border-radius: 1em;
      background: black;
      color: #fff;
      width: 70%;
      cursor: pointer;
    }

    .users-list {
      color: black;
      padding: 2em 1em 1em 1em;
      .title {
        font-size: 1.2em;
        font-weight: 700;
        margin-bottom: 1em;
      }
      .list {
        padding: 0;
        margin: 0;
        list-style: none;
        width: 100%;
        li {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.3em;
          .item {
            background: lightsteelblue;
            padding: 0.2em 1em;
            border-radius: 1em;
            font-size: 0.8em;
          }
        }
      }
    }
  }
`;
