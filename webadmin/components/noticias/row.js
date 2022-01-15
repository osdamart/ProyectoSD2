import { useRef, useState } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined
} from "@ant-design/icons";
import { Button as AntdButton, Form, Radio } from "antd";
import { deleteNoticia, editNoticia } from "../../api/noticias";
import confirm from "../confirm";
import AsyncModal from "../modal";
import NoticiaForm from "./form";
import _ from "lodash";
import { pathEntradas } from "../../utils/constants";

export const RowTablaNoticia = ({
  _id,
  index,
  titulo,
  fecha,
  imagen,
  alternativo,
  fuente,
  descripcion,
  data,
  url
}) => {
  const [form] = Form.useForm();
  const rowRef = useRef();

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

    const [imagenNot, setFileImagen] = useState(null);

  const uploadToImagen = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFileImagen(i);
    }
  };

  const onSubmit = async (data) => {
    const body = new FormData();
    if (imagenNot) {
      body.append("file", imagenNot);
      const response = await fetch("/api/file", {
        method: "POST",
        body
      });
      data["imagen"] = pathEntradas + imagenNot.name;
    }
    return await editNoticia(data, _id);
  };

  const onCreate = async (values) => await editNoticia(values, _id);
  return (
    <tr ref={rowRef} tabIndex={0} key={index} id={index}>
      <td>
        <small>{titulo}</small>
      </td>
      <td>
        <small>{fecha}</small>
      </td>
      <td>
        <small>{fuente}</small>
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
          encabezado="Editar Noticia"
          url={url}
          data={data}
          rowRef={rowRef}
          _id={_id}
        >
          <NoticiaForm
            form={form}
            initialValues={{ _id, titulo, fecha, imagen, alternativo, fuente, descripcion }}
            uploadToImagen={uploadToImagen}
            fecha={fecha}
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
              "Noticia eliminada correctamente",
              deleteNoticia,
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
