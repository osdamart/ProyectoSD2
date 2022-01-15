import { Button as AntdButton } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteContacto } from "../../api/contactos";
import confirm from "../confirm";
import { useRef } from "react";

export const Row = ({
  id,
  nombre,
  email,
  telefono,
  asunto,
  mensaje,
  key,
  data,
  url
}) => {
  const rowRef = useRef();
  return (
    <tr tabIndex="0" key={key} ref={rowRef} id={key}>
      <td>
        <small>{nombre}</small>
      </td>
      <td>
        <small>{email}</small>
      </td>
      <td>
        <small>{telefono}</small>
      </td>
      <td>
        <small>{asunto}</small>
      </td>
      <td>
        <small>{mensaje}</small>
      </td>
      <td>
        <td>
          <AntdButton
            size="small"
            danger
            icon={<DeleteOutlined />}
            title={`Eliminar ${nombre}`}
            aria-labellebdy={id}
            aria-label={`Eliminar ${nombre}`}
            onClick={async () =>
              confirm(
                nombre,
                id,
                "Contacto eliminado correctamente",
                deleteContacto,
                data,
                url,
                key
              )
            }
          />
        </td>
      </td>
    </tr>
  );
};
