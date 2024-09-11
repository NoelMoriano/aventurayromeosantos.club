import React from "react";
import styled from "styled-components";
import { PrincipalSection } from "./PrincipalSection";
import { WhatIsItAbout } from "./WhatIsItAbout.jsx";
import { Tickets } from "./Tickets.jsx";
import { SectionMessage } from "./SectionMessage.jsx";
import { SpotifyIframe } from "./SpotifyIframe.jsx";
import { MapaComponent } from "./MapaComponent.jsx";
import { useGlobalData } from "../../providers/index.js";

export const Home = () => {
  const { tickets, users } = useGlobalData();

  console.log("tickets: ", tickets);
  console.log("users: ", users);

  return (
    <Container>
      <PrincipalSection />
      <WhatIsItAbout />
      <SectionMessage />
      <Tickets tickets={tickets} />
      <MapaComponent />
      <SpotifyIframe />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100svh;
  height: auto;
`;
