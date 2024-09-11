import React from "react";
import styled from "styled-components";
import { Mapa } from "../../images";

export const MapaComponent = () => {
  return (
    <Container>
      <img src={Mapa} alt="aventura mapa" />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 3em 1em;
  img {
    width: 100%;
    max-width: 40em;
    object-fit: contain;
  }
`;
