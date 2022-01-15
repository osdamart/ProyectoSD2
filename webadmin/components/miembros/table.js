import { PlusOutlined } from "@ant-design/icons";
import { Button as AntdButton, Form } from "antd";
import * as FileSaver from "file-saver";
import _ from "lodash";
import moment from "moment";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Col } from "reactstrap";
import * as XLSX from "xlsx";
import { createMiembro } from "../../api/miembros";
import AsyncModal from "../modal";
import MiembroForm from "./form";
import { Row } from "./row";
import { pathEntradas } from "../../utils/constants";


const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const exportToCSV = (apiData, fileName) => {
  const ws = XLSX.utils.json_to_sheet(apiData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

const MiembrosTable = ({ miembros, url, Pagination }) => {
  const [form] = Form.useForm();

  const tableRef = useRef();
  useEffect(() => {
    tableRef.current.focus();
  }, []);

  const [fileCedula, setFileCedula] = useState(null);
  const uploadCedula = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFileCedula(i);
    }
  };

  //const onCreate = async (values) => await createMiembro(values);

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
    return await createMiembro(data);
  };

  return (
    <Fragment>
      <Col className="text-center">
        <AsyncModal
          form={form}
          onCreate={onCreate}
          icon={<PlusOutlined aria-hidden="true" />}
          encabezado="Nuevo Miembro"
          label="Agregar miembro"
          type="primary"
          url={url}
          data={miembros}
          add={true}
        >
          <MiembroForm form={form}  uploadCedula={uploadCedula}/>

        </AsyncModal>
      </Col>
      <br />
      <Col md="12">
        <table className="table w-75 mx-auto" tabIndex="0" ref={tableRef}>
          <caption>Listado de miembros de la asociación</caption>
          <thead className="thead-dark">
            <tr tabIndex="0">
              {_.map(
                [
                  "Nombre",
                  "Email",
                  "Teléfono",
                  "Dirección",
                  "Edad",
                  "Tipo",
                  "Documentos",
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
            {!_.isEmpty(miembros) &&
              _.map(miembros, (miembro, index) => {
                const {
                  nombre,
                  email,
                  telefono,
                  direccion,
                  edad,
                  tipo,
                  _id,
                  cedula,
                  carnet,
                  inscripcion
                } = miembro;
                return (
                  <Fragment key={index}>
                    <Row
                      _id={_id}
                      index={index}
                      nombre={nombre}
                      email={email}
                      telefono={telefono}
                      direccion={direccion}
                      edad={edad}
                      tipo={tipo}
                      carnet={carnet}
                      cedula={cedula}
                      inscripcion={inscripcion}
                      data={miembros}
                      url={url}
                    />
                  </Fragment>
                );
              })}
          </tbody>
        </table>
      </Col>
      <Col md="12">{Pagination()}</Col>
      <Col md="12">
        <AntdButton
          type="primary"
          onClick={() => exportToCSV(miembros, `Miembros-${moment().format("DD-MM-YYYY")}`)}
          role="button"
          style={{ marginLeft: "9pc" }}
        >
          Exportar
        </AntdButton>
      </Col>
    </Fragment>
  );
};
export default MiembrosTable;
