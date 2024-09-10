import React from "react";
import styled from "styled-components";
import { HeaderLayout } from "./HeaderLayout.jsx";
import { FooterLayout } from "./FooterLayout.jsx";

export const BaseLayout = ({ children }) => {
  return (
    <Container>
      <HeaderLayout />
      <main className="content">{children}</main>
      <FooterLayout />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100dvh;
  height: auto;
  position: relative;
`;
