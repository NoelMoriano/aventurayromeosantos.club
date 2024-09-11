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

export const Home = () => {
  const { ticketsWithReservations } = useGlobalData();
  const [visibleModalReserve, setVisibleModalReserve] = useState(true);
  const [ticketSelected, setTicketSelected] = useState(null);

  return (
    <Container>
      <PrincipalSection />
      <WhatIsItAbout />
      <SectionMessage />
      <Tickets
        ticketsWithReservations={ticketsWithReservations}
        onSetVisibleModalReserve={setVisibleModalReserve}
        onSetTicketSelected={setTicketSelected}
      />
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
