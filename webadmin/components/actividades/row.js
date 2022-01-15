import { useRef, useState } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined
} from "@ant-design/icons";
import { Button as AntdButton, Form, Radio } from "antd";
import { deleteActividad, editActividad } from "../../api/actividades";
import confirm from "../confirm";
import AsyncModal from "../modal";
import ActividadForm from "./form";
import _ from "lodash";
import { pathEntradas } from "../../utils/constants";

export const RowTablaActividad = ({
  _id,
  index,
  titulo,
  imagen,
  alternativo,
  descripcion,
  data,
  url
}) => {
  const [form] = Form.useForm();
  const rowRef = useRef();

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

    const [imagenAct, setFileImagen] = useState(null);

  const uploadToImagen = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFileImagen(i);
    }
  };

  const onSubmit = async (data) => {
    const body = new FormData();
    if (imagenAct) {
      body.append("file", imagenAct);
      const response = await fetch("/api/file", {
        method: "POST",
        body
      });
      data["imagen"] = pathEntradas + imagenAct.name;
    }
    return await editActividad(data, _id);
  };

  const onCreate = async (values) => await editActividad(values, _id);
  return (
    <tr ref={rowRef} tabIndex={0} key={index} id={index}>
      <td>
        <small>{titulo}</small>
      </td>
      <td>
        <small>{descripcion}</small>
      </td>
      <td>
        <AsyncModal
          form={form}
          onCreate={onSubmit}
          title={`Editar ${titulo}`}
          icon={<EditOutlined aria-hidden="true" />}
          encabezado="Editar Actividad"
          url={url}
          data={data}
          rowRef={rowRef}
          _id={_id}
        >
          <ActividadForm
            form={form}
            initialValues={{
              _id, titulo, imagen, alternativo, descripcion
            }}
            uploadToImagen={uploadToImagen}
          />
        </AsyncModal>
        <AntdButton
          size="small"
          danger
          icon={<DeleteOutlined aria-hidden="true" />}
          onClick={() =>
            confirm(
              titulo,
              _id,
              "Actividad eliminada correctamente",
              deleteActividad,
              data,
              url,
              index
            )
          }
          aria-label={`Eliminar ${titulo}`}
          title={`Eliminar ${titulo}`}
        />
      </td>
    </tr>
  );
};
