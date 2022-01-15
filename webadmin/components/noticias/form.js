import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Radio, Upload, Image } from "antd";
import _ from "lodash";
import React, { useState } from "react";

export default function NoticiaForm({ form, initialValues, uploadToImagen, fecha }) {
  const { TextArea } = Input;
  const suppImages = [
    "image/jpg",
    "image/jpeg",
    "image/png"
  ];
  
  const alt = (titulo,alternativo)=>{
    if(!alternativo){
      return titulo
    }else {
      return alternativo
    }
  }
  
  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Form.Item
        name="titulo"
        label="Título"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el título de la noticia!"
          }
        ]}
      >
        <Input 
          aria-label="El campo título es obligatorio"
        />
      </Form.Item>
      <Form.Item 
        name="fecha"
         label ="Fecha"
         rules={[
          {
            required: true,
            message: "Por favor ingrese la fuente de la noticia!"
          }
        ]}
      >
        <Input value="fecha.substring(0,11)" type="date"
          aria-label="El campo fecha es obligatorio"
        />
      </Form.Item>

      <Form.Item
        name="imagen"
        label="Imagen"
      >
        <Image 
          width={200} 
          src={_.get(initialValues, "imagen")} 
          alt={alt(_.get(initialValues, "titulo"),_.get(initialValues, "alternativo"))}
          preview={false}
        />
        <Input
          type="file"
          name="imagen"
          accept={suppImages}
          id="imagen"
          onChange={uploadToImagen}
          aria-label="El campo imagen es opcional"
        />
      </Form.Item>
      
      <Form.Item
        name="alternativo"
        id="alternativo"
        label="Descripción de Imagen"
      >
        <Input  
          aria-label="El campo descripción de imagen es opcional"
        />
      </Form.Item>

      <Form.Item
        name="fuente"
        label="Fuente"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la fuente de la noticia!"
          }
        ]}
      >
        <Input 
          aria-label="El campo fuente es opcional"
        />
      </Form.Item>

      <Form.Item
        name="descripcion"
        label="Descripción"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la descripcion de la noticia!"
          }
        ]}
      >
        <TextArea 
          rows={4}
          aria-label="El campo descripción es obligatorio"
        />
      </Form.Item>
    </Form>
  );
}
