import React, { useEffect } from "react";
import styled from "styled-components";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../firebase/index.js";
import { notification, Tag } from "../../../components/index.js";
import { orderBy } from "lodash";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const Home = () => {
  const [tickets = [], ticketsLoading, ticketsError] = useCollectionData(
    firestore.collection("tickets").where("isDeleted", "==", false) || null,
  );

  const [reservations = [], reservationsLoading, reservationsError] =
    useCollectionData(
      firestore.collection("reservations").where("isDeleted", "==", false) ||
        null,
    );

  const error = reservationsError || ticketsError;

  const loading = reservationsLoading || ticketsLoading;

  useEffect(() => {
    error && notification({ type: "error" });
  }, [error]);

  const ticketsWithReservations = orderBy(
    tickets.map((ticket) => ({
      ...ticket,
      reservations: orderBy(
        reservations.filter(
          (reservation) => reservation.ticketId === ticket.id,
        ),
        (reservation) => [reservation.createAt],
        ["desc"],
      ),
    })),
    (ticket) => [ticket.createAt],
    ["desc"],
  );

  return (
    <Container>
      <div className="wrapper-cards">
        {ticketsWithReservations.map((ticketWithReservations, index) => (
          <div className="card" key={index}>
            <div className="header">
              <div className="title">
                <h3>{ticketWithReservations?.name}</h3>{" "}
                <strong>
                  {" "}
                  {ticketWithReservations?.concertDate
                    ? dayjs(ticketWithReservations.concertDate.toDate())
                        .tz("America/Lima")
                        .format("DD/MM/YYYY")
                    : "No found"}
                </strong>
              </div>
              <div className="price">
                <h4>S/ {ticketWithReservations?.price}</h4>
              </div>
            </div>
            <div className="body">
              <h4>Lista de reservas</h4>
              {orderBy(
                ticketWithReservations?.reservations || [],
                (reservation) => reservation.priceOffer,
                "desc",
              ).map((reservation, index) => (
                <div className="reserve-item" key={index}>
                  <ul>
                    <li>
                      DNI: <strong>{reservation?.dni}</strong>
                    </li>
                    <li className="first-name">
                      Nombres: <strong>{reservation?.firstName}</strong>
                    </li>
                    <li className="last-name">
                      Apellidos: <strong>{reservation?.lastName}</strong>
                    </li>
                    <li>
                      Cantidad: <strong>{reservation?.amount}</strong>
                    </li>
                    <li>
                      Precio ofertado:{" "}
                      <strong>{reservation?.priceOffer}</strong>
                    </li>
                    <li>
                      Teléfono: <strong>{reservation?.phoneNumber}</strong>{" "}
                    </li>
                    <li>
                      Nota o mensaje: <strong>{reservation?.message}</strong>
                    </li>
                    <li>
                      F. Registro:{" "}
                      <strong>
                        {reservation?.createAt
                          ? dayjs(reservation.createAt.toDate()).format(
                              "DD/MM/YYYY",
                            )
                          : ""}
                      </strong>
                    </li>
                    <li>
                      Estado: &nbsp;
                      <Tag
                        className="tag-item"
                        color={
                          reservation?.status === "pending" ? "orange" : "green"
                        }
                      >
                        {reservation?.status === "pending"
                          ? "Pendiente"
                          : "Aprobado"}
                      </Tag>
                    </li>
                    <li className="icons">
                      <a
                        href={`tel:${reservation?.phoneNumber}`}
                        target="_blank"
                        className="phone"
                      >
                        <FontAwesomeIcon icon={faPhone} />
                      </a>
                      <a
                        href={`https://wa.me/+51${reservation?.phoneNumber}`}
                        target="_blank"
                        className="wsp"
                      >
                        <FontAwesomeIcon icon={faWhatsapp} />
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100svh;
  padding: 1em;
  background: #fff;
  color: #000;

  .wrapper-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1em;

    .card {
      min-width: 20em;
      background: #eeeeee;
      padding: 1em;
      border-radius: 1em;
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 1em;
      margin-bottom: 1em;

      .header {
        .title {
          display: flex;
          align-items: end;
          gap: 0.5em;

          h3 {
            margin: 0;
            text-transform: capitalize;
          }
        }

        .price {
          color: red;
        }
      }

      .body {
        h4 {
          margin-bottom: 0.3em;
        }

        .reserve-item {
          font-size: 14px;
          .first-name,
          .last-name {
            text-transform: capitalize;
          }
          ul {
            padding: 0.5em;
            margin: 0;
            list-style: none;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 0.5em;
            .icons {
              display: flex;
              gap: 1.5em;
              font-size: 1.5em;
              padding: 0.3em 0;
              .phone {
                color: dodgerblue;
              }
              .wsp {
                color: green;
              }
            }
          }
        }
      }
    }
  }
`;
