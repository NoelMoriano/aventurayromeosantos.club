import React from "react";
import styled from "styled-components";
import { Image } from "../../components";
import { Photo1, Photo2 } from "../../images/index.js";
import { mediaQuery } from "../../styles/index.js";

export const Gallery = () => {
  return (
    <Container>
      <h2 className="title">Galeria de las entradas</h2>
      <div className="images-items">
        <Image.PreviewGroup className="preview-group">
          <Image src={Photo1} className="img" />
          <Image src={Photo2} className="img" />
        </Image.PreviewGroup>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 2em 1em;
  color: black;
  background: #fff;
  .title {
    text-align: center;
  }
  .ant-image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .images-items {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
    ${mediaQuery.minTablet} {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .preview-group {
      .img {
        width: 100%;
        height: 100%;
        border-radius: 1em;
      }
    }
  }
`;
