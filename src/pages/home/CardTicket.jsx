import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles";
import dayjs from "dayjs";
import { isEmpty, orderBy } from "lodash";
import { Tag, Typography } from "../../components";

export const CardTicket = ({
  ticketsWithReservations,
  onSetVisibleModalReserve,
  onSetTicketSelected,
}) => {
  return (
    <Container color={ticketsWithReservations?.color}>
      <div className="header">
        <div className="title">{ticketsWithReservations?.name}</div>
        <div className="color-type" />
        <div className="ticket-price">
          S/ {ticketsWithReservations.price.toFixed(2)}
        </div>

        <div className="concert">
          <div>{ticketsWithReservations?.concert}</div>

          <div className="place">{ticketsWithReservations?.place}</div>
        </div>

        <div className="date-item">
          <div className="date">
            {ticketsWithReservations?.concertDate
              ? dayjs(ticketsWithReservations.concertDate.toDate())
                  .tz("America/Lima")
                  .format("DD/MM/YYYY")
              : "No found"}
          </div>
          {/*<div className="amount">*/}
          {/*  Cantidad: {ticketsWithReservations?.amount}*/}
          {/*</div>*/}
        </div>
      </div>
      <div className="body">
        <button
          className="btn-reserve-ticket"
          onClick={() => {
            onSetVisibleModalReserve(true);
            return onSetTicketSelected(ticketsWithReservations);
          }}
        >
          Registrarme
        </button>
        <div className="users-list">
          <div className="title">Lista en espera</div>
          <ul className="list">
            {isEmpty(ticketsWithReservations?.reservations)
              ? "¡Aún no hay personas en espera, sé el primero y regístrate!"
              : orderBy(
                  ticketsWithReservations?.reservations || [],
                  (reservation) => reservation.priceOffer,
                  "desc",
                ).map((ticketWithReservation, index) => (
                  <li key={index + 1}>
                    <div className="left-item">
                      <div className="number-item">{index + 1}</div>
                      <div className="name-and-date">
                        <Typography.Text
                          style={{ width: 110 }}
                          ellipsis
                          className="user-name"
                        >
                          {ticketWithReservation.firstName}{" "}
                          {ticketWithReservation.lastName.split(" ")?.[0] || ""}
                        </Typography.Text>
                        <div className="create-at">
                          {ticketWithReservation?.createAt
                            ? dayjs(
                                ticketWithReservation.createAt.toDate(),
                              ).format("DD/MM/YYYY")
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className="price-and-status">
                      <div className="status">
                        <Tag className="tag-item" color="orange">
                          Pendiente
                        </Tag>
                      </div>
                      {ticketWithReservation?.priceOffer && (
                        <div className="price-offer">
                          <small>Precio ofertado: </small>
                          <strong>S/ {ticketWithReservation.priceOffer}</strong>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
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
  border: 1.5px solid #adb7bd77;

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
      font-weight: bold;
      padding: 0.5em 1em;
    }

    .color-type {
      width: 100%;
      height: 0.3em;
      background: ${({ color }) => color};
    }

    .ticket-price {
      font-size: 1.7em;
      font-weight: bold;
      text-align: center;
      color: red;
    }

    .concert {
      display: flex;
      justify-content: space-between;
    }

    .date-item {
      display: flex;
      justify-content: center;
      background: #c2c2c224;
      font-size: 1.1em;
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
        font-size: 0.8em;

        li {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          padding: 0.4em 0.5em;
          border-radius: 0.5em;
          margin-bottom: 0.5em;

          &:hover {
            background: aliceblue;
          }

          .left-item {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 1em;

            .number-item {
              width: 2em;
              height: 2em;
              border-radius: 50%;
              padding: 0.3em;
              background: black;
              color: #fff;
              font-size: 0.7em;
              font-weight: 600;
            }

            .name-and-date {
              gap: 1em;
              text-transform: capitalize;
              text-align: start;

              .user-name {
                font-size: 0.9em;
              }

              .create-at {
                font-size: 0.8em;
                color: #a6a6a6;
              }
            }
          }

          .price-and-status {
            display: flex;
            flex-direction: column;
            align-items: end;
            justify-content: start;

            .tag-item {
              padding: -2px 0.5em;
              border-radius: 1em;
              font-size: 0.6em;
              margin: 0;
              height: 2em;
              display: flex;
              align-items: center;
            }

            .price-offer {
              color: red;
              font-size: 1em;
              margin-top: 0.3em;
              text-align: right;
            }
          }
        }
      }
    }
  }
`;
