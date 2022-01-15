import { Button, Form, Input, InputNumber, Radio } from "antd";
import _ from "lodash";
import React from "react";

export default function MiembroForm({ form, initialValues, uploadCedula }) {
  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Form.Item
        name="nombre"
        label="Nombre"
        rules={[
          {
            required: true,
            message: "Campo nombre obligatorio!"
          }
        ]}
      >
        <Input aria-label="Campo nombre obligatorio" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Campo email obligatorio!"
          }
        ]}
      >
        <Input aria-label="Campo email es obligatorio" />
      </Form.Item>
      <Form.Item
        name="telefono"
        label="Teléfono"
        rules={[
          {
            required: true,
            message: "Campo teléfono es obligatorio!"
          }
        ]}
      >
        <Input aria-label="Campo teléfono es obligatorio" />
      </Form.Item>
      <Form.Item
        name="direccion"
        label="Dirección"
        rules={[
          {
            required: true,
            message: "Campo dirección es obligatorio!"
          }
        ]}
      >
        <Input aria-label="Campo dirección es obligatorio" />
      </Form.Item>
      <Form.Item
        name="edad"
        label="Edad"
        rules={[
          {
            required: true,
            message: "Campo edad es obligatorio!"
          }
        ]}
      >
        <InputNumber aria-label="Campo edad es obligatorio" />
      </Form.Item>

      <Form.Item label="Cédula">
        {initialValues && (
          <a
            target="_blank"
            href={_.get(initialValues, "cedula")}
            rel="noopener noreferrer"
          >
            <Button aria-label="Abrir archivo actual de cédula en una nueva pestaña">Abrir documento de cédula</Button>
          </a>
        )}
        <br />
        <Input
          type="file"
          name="cedula"
          id="cedula"
          onChange={uploadCedula}
          aria-label="El campo cedula es opcional"
        />
      </Form.Item>

      <Form.Item
        name="tipo"
        rules={[
          {
            required: true,
            message: "Campo tipo es obligatorio!"
          }
        ]}
      >
        <Radio.Group aria-label="Campo obligatorio">
          <Radio value="socio">Socio</Radio>
          <Radio value="voluntario">Voluntario</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}
