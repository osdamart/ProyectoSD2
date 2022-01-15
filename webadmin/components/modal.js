import { Button, Modal } from "antd";
import React, { useState } from "react";
import { mutate } from "swr";
import _ from "lodash";
import { pathEntradas } from "../utils/constants";

export default function AsyncModal({
  children,
  form,
  onCreate,
  _id,
  icon,
  title,
  type,
  encabezado,
  url,
  data,
  rowRef,
  label,
  add
}) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const actualizarArreglo = (arr, obj) => {
    const index = _.findIndex(arr, { _id });
    arr[index] = obj;
    return _.compact(arr);
  };

  const handleOk = async (values, _id) => {
    let carnet = _.get(values, "carnet.file.name");
    let cedula = _.get(values, "cedula.file.name");
    if (!_.isEmpty(carnet)) {
      values.carnet = pathEntradas + carnet;
    }
    if (!_.isEmpty(cedula)) {
      values.cedula = pathEntradas + cedula;
    }
    setConfirmLoading(true);

    setTimeout(async () => {
      setVisible(false);
      if (add) {
        //const res = await onCreate(values);
        if (url){
          mutate(url, _.concat([await onCreate(values)], [...data], false));
        }
        form.resetFields();
      } else {
        const res = await onCreate(values, _id);
        if (url) mutate(url, actualizarArreglo([...data], res), false);
        
      }
      setConfirmLoading(false);
    }, 2000);

  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const refrescar = () => {
    if (add) {
      form.resetFields();
      setVisible(false);
    }
  };

  return (
    <>
      <Button
        type={type}
        onClick={showModal}
        size="small"
        icon={icon}
        title={title}
        id="editar"
        aria-label={title}
        aria-labelledby={_id || _.uniqueId()}
      >
        {label}
      </Button>
      <Modal
        title={encabezado}
        visible={visible}
        maskClosable={false}
        onOk={() =>
          form
            .validateFields()
            .then((values) => {
              handleOk(values, _id);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            })
        }
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        mask={false}
        centered
        afterClose={() => {
          if (url) mutate(url);
          if (rowRef) rowRef.current.focus();
          if (add) {
            rowRef = document.getElementById(0);
            if (rowRef) rowRef.focus();
          }
        }}
        okText="Guardar"
        cancelText="Cancelar"
        closable={false}
      >
        {children}
      </Modal>
    </>
  );
}
