import _ from "lodash";
import API from "./instance";
import moment from "moment";

export const getMiembros = async () => {
  try {
    const res = await API.get(`form?timestamp=${moment().format()}`);
    const miembros = _.sortBy(res.data.formReceived, (row) => {
      let fecha = row._id.toString().substring(0, 8);
      fecha = new Date(parseInt(fecha, 16) * 1000);
      return fecha;
    }).reverse();
    return miembros;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteMiembro = async (id) => {
  try {
    const res = await API.get(`form/delete/${id}`);
    return res.data.formReceived;
  } catch (error) {
    console.log(error);
  }
};

export const createMiembro = async (data) => {
  _.assign(data);

  try {
    const res = await API.post(`form/create/`, data);
    return res.data.newFormulario;
  } catch (error) {
    console.log(error);
  }
};

export const editMiembro = async (data, id) => {
  _.assign(data, { id });

  try {
    const res = await API.post(`form/update/`, data);
    return res.data.formularioReceived;
  } catch (error) {
    console.log(error);
  }
};
