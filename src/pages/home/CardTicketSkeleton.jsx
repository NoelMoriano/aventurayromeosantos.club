import React from "react";
import { Skeleton, Space } from "../../components/index.js";
import styled from "styled-components";
import { mediaQuery } from "../../styles/index.js";

export const CardTicketSkeleton = () => {
  return (
    <Container>
      <Space>
        <Skeleton.Input active />
      </Space>
      <Space direction="vertical">
        <Space>
          <Skeleton.Input active />
          <Skeleton.Input active />
        </Space>
        <Space>
          <Skeleton.Input active />
          <Skeleton.Input active />
        </Space>
      </Space>
      <div style={{ width: "50%" }}>
        <Skeleton.Button active block />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: ".5em",
        }}
      >
        <Skeleton.Input active block />
        <Skeleton.Input active block />
        <Skeleton.Input active block />
        <Skeleton.Input active block />
      </div>
    </Container>
  );
};

const Container = styled.li`
  width: 100%;
  border-radius: 1.3em;
  background: #fff;
  color: #fff;
  border: 1px solid #eee;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  ${mediaQuery.minDesktop} {
    width: calc(80% / 3);
  }

  .color-type {
    width: 100%;
    height: 0.5em;
    background: #deae01;
  }
`;
