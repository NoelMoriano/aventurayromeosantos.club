import React from "react";
import styled from "styled-components";
import { Space as SpaceAntd } from "antd";

// interface Props {
//     onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
//     children?: React.ReactNode;
// }

export const Form = ({ children, ...props }) => (
  <form noValidate autoComplete="off" {...props}>
    <SpaceStyled size="middle" direction="vertical">
      {children}
    </SpaceStyled>
  </form>
);

const SpaceStyled = styled(SpaceAntd)`
  width: 100%;
`;
