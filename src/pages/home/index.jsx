import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PrincipalSection } from "./PrincipalSection";
import { WhatIsItAbout } from "./WhatIsItAbout.jsx";
import { Tickets } from "./Tickets.jsx";
import { SectionMessage } from "./SectionMessage.jsx";
import { SpotifyIframe } from "./SpotifyIframe.jsx";
import { MapaComponent } from "./MapaComponent.jsx";
import { ModalReserve } from "./ModalReserve.jsx";
import { Gallery } from "./Gallery.jsx";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase/index.js";
import { notification } from "../../components/index.js";
import { orderBy } from "lodash";

export const Home = () => {
  const [visibleModalReserve, setVisibleModalReserve] = useState(true);
  const [ticketSelected, setTicketSelected] = useState(null);

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
      <PrincipalSection />
      <WhatIsItAbout />
      <SectionMessage />
      <Tickets
        loadingData={loading}
        ticketsWithReservations={ticketsWithReservations}
        onSetVisibleModalReserve={setVisibleModalReserve}
        onSetTicketSelected={setTicketSelected}
      />
      <Gallery />
      <MapaComponent />
      <SpotifyIframe />
      <ModalReserve
        visibleModalReserve={visibleModalReserve && ticketSelected}
        onClickVisibleModalReserve={setVisibleModalReserve}
        onSetTicketSelected={setTicketSelected}
        ticketSelected={ticketSelected}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100svh;
  height: auto;
`;
