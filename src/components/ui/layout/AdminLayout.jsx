import React from "react";
import styled from "styled-components";

export const AdminLayout = ({ children }) => {
  return (
    <Container>
      <div className="main">{children}</div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100svh;
  height: auto;
`;
