import { notification } from "antd";

export default function openNotificationWithIcon(title, msg) {
  notification.info({
    message: title,
    description: msg
  });
}
