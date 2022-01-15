import { PlusOutlined } from "@ant-design/icons";
import { Button as AntdButton, Form } from "antd";
import * as FileSaver from "file-saver";
import _ from "lodash";
import moment from "moment";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Col } from "reactstrap";
import * as XLSX from "xlsx";
import {crearNoticia } from "../../api/noticias";
import AsyncModal from "../modal";
import NoticiaForm from "./form";
import { RowTablaNoticia } from "./row";
import { pathEntradas } from "../../utils/constants";

const NoticiasTable = ({ noticias, url, Pagination }) => {
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

  const date=(fecha)=>{
    if(fecha){
      return fecha.substring(0,10)
    }
    else{ return fecha}
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
    else{
      data["imagen"] = pathEntradas + "noticia1.jpg";
    }
    return await crearNoticia(data);
  };
  
  return (
    <Fragment>
      <Col className="text-center">
        <AsyncModal
          form={form}
          onCreate={onSubmit}
          icon={<PlusOutlined aria-hidden="true" />}
          encabezado="Nueva Noticia"
          label="Agregar noticia"
          type="primary"
          url={url}
          data={noticias}
          add={true}
        >
          <NoticiaForm 
            form={form} 
            uploadToImagen={uploadToImagen}/>
        </AsyncModal>
      </Col>
      <br />
      <Col md="12">
        <table className="table w-75 mx-auto" tabIndex="0" ref={tableRef}>
          <caption>Listado de noticias de la asociación</caption>
          <thead className="thead-dark">
            <tr tabIndex="0">
              {_.map(
                [
                  "Título",
                  "Fecha",
                  "Fuente",
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
            {!_.isEmpty(noticias) &&
              _.map(noticias, (noticia, index) => {
                const {
                  titulo,
                  fecha,
                  imagen,
                  alternativo,
                  fuente,
                  descripcion,
                  _id,
                } = noticia;
                return (
                  <Fragment key={index}>
                    <RowTablaNoticia
                      _id={_id}
                      index={index}
                      titulo={titulo}
                      fecha={date(fecha)}
                      imagen={imagen}
                      fuente={fuente}
                      alternativo={alt(titulo,alternativo)}
                      descripcion={descripcion}
                      data={noticias}
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
export default NoticiasTable;
