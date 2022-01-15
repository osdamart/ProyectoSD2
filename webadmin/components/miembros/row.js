import { useRef, useState } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined
} from "@ant-design/icons";
import { Button as AntdButton, Form, Radio } from "antd";
import { deleteMiembro, editMiembro } from "../../api/miembros";
import confirm from "../confirm";
import AsyncModal from "../modal";
import MiembroForm from "./form";
import _ from "lodash";

export const Row = ({
  _id,
  index,
  nombre,
  email,
  telefono,
  direccion,
  edad,
  tipo,
  cedula,
  inscripcion,
  data,
  url
}) => {
  const [form] = Form.useForm();
  const rowRef = useRef();

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };
  //const onCreate = async (values) => await editMiembro(values, _id);
  const [fileCedula, setFileCedula] = useState(null);
  const uploadCedula = (event) => {
    if (_.has(event, "target.files[0]")) {
      const i = event.target.files[0];
      setFileCedula(i);
    }
  };

  const onCreate = async (data) => {
    const body = new FormData();
    if (fileCedula) {
      body.append("file", fileCedula);
      const response = await fetch("/api/file", {
        method: "POST",
        body
      });
      data["cedula"] = pathEntradas + fileCedula.name;
    }
    /*else{
      data["imagen"] = pathEntradas + "noticia1.jpg";
    }*/
    return await editMiembro(values, _id);
  };

  return (
    <tr ref={rowRef} tabIndex={0} key={index} id={index}>
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
        <small>{direccion}</small>
      </td>
      <td>
        <small>{edad}</small>
      </td>
      <td>
        <small>{_.startCase(tipo)}</small>
      </td>
      <td>
        <Radio.Group size="small">
          {cedula && (
            <AntdButton
              type="primary"
              ghost
              icon={<DownloadOutlined aria-hidden="true" />}
              size="small"
              onClick={() => {
                openInNewTab(cedula);
                rowRef.current.focus();
              }}
              title={`Cédula de ${nombre}`}
              aria-label={`Cédula de ${nombre}. Se abrirá una nueva pestaña`}
            />
          )}
          {inscripcion && (
            <AntdButton
              type="primary"
              ghost
              icon={<DownloadOutlined aria-hidden="true" />}
              size="small"
              onClick={() => {
                openInNewTab(inscripcion);
                rowRef.current.focus();
              }}
              title={`Formulario de ${nombre}`}
              aria-label={`Formulario de ${nombre}. Se abrirá una nueva pestaña`}
            />
          )}
        </Radio.Group>
      </td>
      <td>
        <AsyncModal
          form={form}
          onCreate={onCreate}
          title={`Editar ${nombre}`}
          icon={<EditOutlined aria-hidden="true" />}
          encabezado="Editar Miembro"
          url={url}
          data={data}
          rowRef={rowRef}
          _id={_id}
        >
          <MiembroForm
            form={form}
            initialValues={{
              _id,
              nombre,
              email,
              telefono,
              direccion,
              edad,
              tipo,
              cedula
            }}
            uploadCedula={uploadCedula}
          />
        </AsyncModal>
        <AntdButton
          size="small"
          danger
          icon={<DeleteOutlined aria-hidden="true" />}
          onClick={() =>
            confirm(
              nombre,
              _id,
              "Miembro eliminado correctamente",
              deleteMiembro,
              data,
              url,
              index
            )
          }
          aria-label={`Eliminar ${nombre}`}
          title={`Eliminar ${nombre}`}
        />
      </td>
    </tr>
  );
};
