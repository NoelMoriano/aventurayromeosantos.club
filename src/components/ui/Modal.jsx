import React from "react";
import { Modal as AntdModal } from "antd";

// interface Props {
//   closable: boolean;
//   centered: boolean;
//   footer: null;
//   children: JSX.Element;
// }

export const Modal = ({
  closable = false,
  onCancel,
  centered = true,
  footer = null,
  children,
  ...props
}) => (
  <AntdModal
    closable={closable}
    onCancel={onCancel}
    centered={centered}
    footer={footer}
    {...props}
  >
    {children}
  </AntdModal>
);
