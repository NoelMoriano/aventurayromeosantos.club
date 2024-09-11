import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

export const CardSelectedTicket = ({ ticket }) => {
  return (
    <Container color={ticket?.color}>
      <div className="left-item">
        <div className="name">{ticket?.name}</div>
        <div>
          {ticket?.concertDate
            ? dayjs(ticket.concertDate.toDate())
                .tz("America/Lima")
                .format("DD/MM/YYYY")
            : "No found"}
        </div>
        <div>{ticket?.place}</div>
      </div>
      <div className="right-item">S/ {ticket?.price.toFixed(2)}</div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2em;
  text-transform: uppercase;
  border-radius: 1.3em;
  background: #fff;
  padding: 0.3em 1em;
  font-size: 0.8em;
  border: 2px solid ${({ color }) => color};
  .left-item {
    .name {
      font-size: 1.1em;
      font-weight: bold;
    }
  }
  .right-item {
    font-size: 1.3em;
    font-weight: bold;
    color: red;
  }
`;
