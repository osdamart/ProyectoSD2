import axios from "axios";
import _ from "lodash";
import API from "./instance";

export const getActividades = async () => {
  try {
    const res = await API.get(`activity`);
    return res.data.newsReceived;
  } catch (error) {
    console.log(error);
  }
};

export const crearActividad = async (data) => {
  try {
    const res = await API.post(`activity/create`, data);
    return res.data.newActividad;
  } catch (error) {
    console.log(error);
  }
};

export const editActividad= async (data, id) => {
  _.assign(data, { id });
  try {
    const res = await API.post(`activity/update/`, data);
    return res.data.actividadReceived;
  } catch (error) {
    console.log(error);
  }
};

export const deleteActividad = async (id) => {
  try {
    const res = await API.get(`activity/delete/${id}`);
    return res.data.actividadReceived;
  } catch (error) {
    console.log(error);
  }
};
