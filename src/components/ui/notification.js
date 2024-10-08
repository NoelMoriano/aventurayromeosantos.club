import { notification as notificationAntd } from "antd";

// type Type = "error" | "success" | "info" | "warning" | "open" | "close";
//
// interface NotificationProps {
//     type: Type;
//     title?: string;
//     description?: string;
//     placement?: NotificationPlacement;
//     duration?: number;
//     key?: string;
//     icon?: React.ReactNode;
// }

export const notification = ({
  type,
  title,
  description,
  placement = "topLeft",
  duration = 5,
  key,
  icon,
  ...props
}) => {
  if (type === "close") return key ? notificationAntd.close(key) : undefined;

  const currentType = types[type];

  return notificationAntd[type]({
    duration: duration,
    placement: placement,
    message: title || currentType.title,
    description: description || currentType.description,
    key: key,
    icon: icon,
    ...props,
  });
};

const types = {
  error: {
    title: "Ocurrió un error!",
    description: "Por favor, inténtelo más tarde...",
  },
  success: {
    title: "Operación exitosa!",
    description: "",
  },
  info: {
    title: "",
    description: "",
  },
  warning: {
    title: "",
    description: "",
  },
  warn: {
    title: "",
    description: "",
  },
  open: {
    title: "",
    description: "",
  },
};
