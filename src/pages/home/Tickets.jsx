import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles";
import { CardTicket } from "./CardTicket";
import { isEmpty } from "lodash";
import { CardTicketSkeleton } from "./CardTicketSkeleton.jsx";

export const Tickets = ({ tickets = [] }) => {
  return (
    <Container id="tickets">
      <h2>Entradas (Tickets)</h2>
      <p className="description">
        Recordar que solo son <strong>6 entradas</strong> disponibles,{" "}
        <strong>4 VIPS</strong> y <strong>2 Generales</strong> con distintas
        fechas.
      </p>
      <div className="tickets-items">
        <ul className="card-lists">
          {isEmpty(tickets) ? (
            <>
              <CardTicketSkeleton />
              <CardTicketSkeleton />
              <CardTicketSkeleton />
            </>
          ) : (
            tickets.map((ticket) => <CardTicket ticket={ticket} />)
          )}
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
