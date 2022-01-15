import { PlusOutlined } from "@ant-design/icons";
import { Button as AntdButton, Form } from "antd";
import * as FileSaver from "file-saver";
import _ from "lodash";
import moment from "moment";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Col } from "reactstrap";
import * as XLSX from "xlsx";
import { crearActividad } from "../../api/actividades";
import AsyncModal from "../modal";
import ActividadForm from "./form";
import { RowTablaActividad } from "./row";
import { pathEntradas } from "../../utils/constants";

const ActividadesTable = ({ actividades, url, Pagination }) => {
  const [form] = Form.useForm();

  const tableRef = useRef();
  useEffect(() => {
    tableRef.current.focus();
  }, []);

  const alt = (titulo,alternativo)=>{
    if(_.isEmpty(alternativo)){
      return titulo
    }else {
      return alternativo
    }
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
    else{
      data["imagen"] = pathEntradas + "noticia1.jpg";
    }
    return await crearActividad(data);
  };

  return (
    <Fragment>
      <Col className="text-center">
        <AsyncModal
          form={form}
          onCreate={onSubmit}
          icon={<PlusOutlined aria-hidden="true" />}
          encabezado="Nueva Actividad"
          label="Agregar actividad"
          type="primary"
          url={url}
          data={actividades}
          add={true}
        >
          <ActividadForm 
            form={form} 
            uploadToImagen={uploadToImagen}/>
        </AsyncModal>
      </Col>
      <br />
      <Col md="12">
        <table className="table w-75 mx-auto" tabIndex="0" ref={tableRef}>
          <caption>Listado de actividades de la asociación</caption>
          <thead className="thead-dark">
            <tr tabIndex="0">
              {_.map(
                [
                  "Título",
                  "Descripción",
                  "Opciones"
                ],
                (t, i) => {
                  return (
                    <th
                      key={i}
                      role="columnheader"
                      aria-label={t}
                      aria-labelledby={t + " " + i}
                      scope="col"
                    >
                      <small>
                        <b>{t}</b>
                      </small>
                    </th>
                  );
                }
              )}
            </tr>
          </thead>
          <tbody>
            {!_.isEmpty(actividades) &&
              _.map(actividades, (actividad, index) => {
                const {
                  titulo,
                  imagen,
                  alternativo,
                  descripcion,
                  _id,
                } = actividad;
                return (
                  <Fragment key={index}>
                    <RowTablaActividad
                      _id={_id}
                      index={index}
                      titulo={titulo}
                      imagen={imagen}
                      alternativo={alt(titulo,alternativo)}
                      descripcion={descripcion}
                      data={actividades}
                      url={url}
                    />
                  </Fragment>
                );
              })}

          </tbody>
        </table>
      </Col>
      <Col md="12">{Pagination()}</Col>
    </Fragment>
  );
};
export default ActividadesTable;
