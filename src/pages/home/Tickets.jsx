import React, { useState } from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles";
import { CardTicket } from "./CardTicket";
import { isEmpty } from "lodash";
import { CardTicketSkeleton } from "./CardTicketSkeleton.jsx";
import { ModalReserveRemove } from "./ModalReserveRemove.jsx";
import { ModalReserveEdit } from "./ModalReserveEdit.jsx";

export const Tickets = ({
  loadingData,
  ticketsWithReservations = [],
  onSetVisibleModalReserve,
  onSetTicketSelected,
}) => {
  const [modalsData, setModalsData] = useState(null);
  const [isVisibleModalRemove, setIsVisibleModalRemove] = useState(false);
  const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false);

  return (
    <Container id="tickets">
      <h2>Entradas (Tickets)</h2>
      <p className="description">
        Disponibles <strong>4 VIPS</strong> y <strong>2 Generales</strong> con
        distintas fechas. <br />
        <small>* Válido solo para Perú 🇵🇪</small> <br />
      </p>
      <div className="tickets-items">
        <ul className="card-lists">
          {loadingData || isEmpty(ticketsWithReservations) ? (
            <>
              <CardTicketSkeleton />
              <CardTicketSkeleton />
              <CardTicketSkeleton />
            </>
          ) : (
            ticketsWithReservations.map((ticketWithReservation, index) => (
              <CardTicket
                key={index}
                ticketsWithReservations={ticketWithReservation}
                onSetVisibleModalReserve={onSetVisibleModalReserve}
                onSetTicketSelected={onSetTicketSelected}
                modalsData={modalsData}
                setModalsData={setModalsData}
                setIsVisibleModalRemove={setIsVisibleModalRemove}
                setIsVisibleModalEdit={setIsVisibleModalEdit}
              />
            ))
          )}
        </ul>
      </div>
      <ModalReserveRemove
        visibleModal={isVisibleModalRemove}
        onClickVisibleModal={setIsVisibleModalRemove}
        modalsData={modalsData}
        setModalsData={setModalsData}
      />
      <ModalReserveEdit
        visibleModal={isVisibleModalEdit}
        onClickVisibleModal={setIsVisibleModalEdit}
        modalsData={modalsData}
        setModalsData={setModalsData}
      />
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
    margin: auto auto 2em auto;
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
      gap: 1em;
    }
  }
`;
