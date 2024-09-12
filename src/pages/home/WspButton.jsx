import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

export const WspButton = () => {
  return (
    <Container>
      <a href="https://wa.me/+51948776900" target="_blank" className="content">
        <FontAwesomeIcon icon={faWhatsapp} className="wsp-icon" />
        <span className="number-phone">948 776 900</span>
      </a>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 700;
  .content {
    width: auto;
    padding: 0.7em;
    background: #5cc753;
    color: white;
    position: fixed;
    bottom: 3.5em;
    right: 1em;
    border-radius: 7rem;
    display: flex;
    gap: 0.5em;
    text-decoration: none;

    .wsp-icon {
      font-size: 1.2rem;
    }
    .number-phone {
      font-size: 1em;
      font-weight: 600;
    }
  }
`;
