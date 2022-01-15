import { DownloadOutlined } from "@ant-design/icons";
import { Button as AntdButton } from "antd";
import FileSaver from "file-saver";
import _ from "lodash";
import moment from "moment";
import { Fragment, useEffect, useRef } from "react";
import { Col } from "reactstrap";
import XLSX from "xlsx";
import { Row } from "./row";

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

const ContactosTable = ({ contactos, url }) => {
  const tableRef = useRef();
  useEffect(() => {
    tableRef.current.focus();
  }, []);
  return (
    <Fragment>
      <Col className="text-center">
        <AntdButton
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => exportToCSV(contactos, `Contactos-${moment().format("DD-MM-YYYY")}`)}
          role="button"
        >
          Exportar
        </AntdButton>
      </Col>
      <Col md="12">
        <table className="table w-75 mx-auto" tabIndex="0" ref={tableRef}>
          <caption>
            Listado personas que han ingresado sus datos a través del formulario
            de contacto
          </caption>
          <thead>
            <tr tabIndex="0">
              {_.map(
                [
                  "Nombre",
                  "Email",
                  "Teléfono",
                  "Asunto",
                  "Mensaje",
                  "Opciones"
                ],
                (t, i) => {
                  return (
                    <th key={i}>
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
            {_.map(contactos, (contacto, i) => {
              const { nombre, correo, telefono, asunto, mensaje, _id } =
                contacto;
              return (
                <Row
                  id={_id}
                  nombre={nombre}
                  email={correo}
                  telefono={telefono}
                  asunto={asunto}
                  mensaje={mensaje}
                  key={i}
                  data={contactos}
                  url={url}
                />
              );
            })}
          </tbody>
        </table>
      </Col>
    </Fragment>
  );
};
export default ContactosTable;
