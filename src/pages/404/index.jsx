import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Page404 = () => {
  const navigate = useNavigate();

  const navigateToInitialPage = () => navigate("/");

  return (
    <Container>
      <div>
        <h1 className="ant-result-title">404</h1>
        <h3 className="ant-result-subtitle">
          Lo sentimos, la página que visistaste no existe.
        </h3>
      </div>
      <button type="primary" onClick={() => navigateToInitialPage()}>
        Ir a pagina de inicio
      </button>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-result-title,
  .ant-result-subtitle {
    color: #fff !important;
  }

  button {
    background: red;
    border-color: red;
  }
`;
