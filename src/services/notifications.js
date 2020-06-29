import { toast } from "react-toastify";
import { notification } from "antd";
import "react-toastify/dist/ReactToastify.min.css";

const DEFAULT_OPTIONS = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 5000,
};

export function notificationError(message) {
  toast.error(message, DEFAULT_OPTIONS);
}

export function notificationSuccess(message) {
  toast.success(message, DEFAULT_OPTIONS);
}

export function openAntdNotification({ type, title, message }) {
  if (typeof type === undefined) {
    notification.open({
      message: title,
      description: message,
      placement: "bottomRight",
    });
  }
  if (type) {
    notification[type]({
      message: title,
      description: message,
      placement: "bottomRight",
    });
  }
}
