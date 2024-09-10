import React from "react";
import styled from "styled-components";
import { PrincipalSection } from "./PrincipalSection";
import { WhatIsItAbout } from "./WhatIsItAbout.jsx";
import { Tickets } from "./Tickets.jsx";

export const Home = () => {
  return (
    <Container>
      <PrincipalSection />
      <WhatIsItAbout />
      <Tickets />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100svh;
  height: auto;
`;
