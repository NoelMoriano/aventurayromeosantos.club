import React, { useState } from "react";
import styled from "styled-components";
import { SpotifyIframes } from "./SpotifyIframes.jsx";
import { ModalFansRegister } from "./ModalFansRegister.jsx";
import { SectionMessage } from "./SectionMessage.jsx";

export const Home = () => {
  const [visibleModalFansRegister, setVisibleModalFansRegister] =
    useState(false);

  const onClickVisibleModalFansRegister = () =>
    setVisibleModalFansRegister(!visibleModalFansRegister);

  return (
    <Container>
      <div className="first-section">
        <h1>Aventura y Romeo Santos - Fans</h1>
      </div>
      <SpotifyIframes />
      <SectionMessage
        onClickVisibleModalFansRegister={onClickVisibleModalFansRegister}
      />
      <ModalFansRegister
        visibleModal={visibleModalFansRegister}
        onClickVisibleModal={onClickVisibleModalFansRegister}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  .first-section {
    text-align: center;
    padding: 1em 0;
  }
`;
