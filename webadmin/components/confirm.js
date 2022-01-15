import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import _ from "lodash";
import { mutate } from "swr";
import openNotificationWithIcon from "../components/notification";

export default function confirm(
  nombre,
  _id,
  encabezado,
  onOk,
  data,
  url,
  index
) {
  return Modal.confirm({
    title: "Eliminar",
    icon: <ExclamationCircleOutlined aria-hidden="true" />,
    content: nombre,
    okText: "Eliminar",
    cancelText: "Cancelar",
    onOk: async () => {
      if (url)
        mutate(
          url,
          _.filter([...data], (d) => d._id !== _id),
          false
        );
      await onOk(_id);
      openNotificationWithIcon(encabezado, nombre);
    },
    afterClose: () => {
      let row;
      if (url) mutate(url);
      if (_.isNumber(index)) {
        if (index === 0) {
          row = document.getElementById(index + 1);
        } else {
          row = document.getElementById(index - 1);
        }
        if (row) row.focus();
      }
    }
  });
}
