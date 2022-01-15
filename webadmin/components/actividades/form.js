import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Radio, Upload, Image } from "antd";
import _ from "lodash";
import React, { useState } from "react";

export default function ActividadForm({ form, initialValues, uploadToImagen }) {
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
            message: "Por favor ingrese el título de la actividad!"
          }
        ]}
      >
        <Input 
          aria-label="El campo título es obligatorio"
        />
      </Form.Item>

      <Form.Item
        name="imagen"
        label="Imagen"
        valuePropName="file"
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
          onChange={uploadToImagen}
          aria-label="El campo imagen es opcional"
        />
      </Form.Item>

      <Form.Item
        name="alternativo"
        label="Descripción de Imagen"
      >
        <Input 
          aria-label="El campo descripción de imagen es opcional"
        />
      </Form.Item>

      <Form.Item
        name="descripcion"
        label="Descripción"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la descripción de la actividad!"
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
