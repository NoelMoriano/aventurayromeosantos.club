import React, { useState } from "react";
import styled from "styled-components";
import { PrincipalSection } from "./PrincipalSection";
import { WhatIsItAbout } from "./WhatIsItAbout.jsx";
import { Tickets } from "./Tickets.jsx";
import { SectionMessage } from "./SectionMessage.jsx";
import { SpotifyIframe } from "./SpotifyIframe.jsx";
import { MapaComponent } from "./MapaComponent.jsx";
import { useGlobalData } from "../../providers/index.js";
import { ModalReserve } from "./ModalReserve.jsx";
import { Gallery } from "./Gallery.jsx";

export const Home = () => {
  const { loadingData, ticketsWithReservations } = useGlobalData();
  const [visibleModalReserve, setVisibleModalReserve] = useState(true);
  const [ticketSelected, setTicketSelected] = useState(null);

  return (
    <Container>
      <PrincipalSection />
      <WhatIsItAbout />
      <SectionMessage />
      <Tickets
        loadingData={loadingData}
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
