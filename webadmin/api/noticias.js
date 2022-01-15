import axios from "axios";
import _ from "lodash";
import API from "./instance";


export const getNoticias = async () => {
  try {
    const res = await API.get(`news`);
    return res.data.newsReceived;
  } catch (error) {
    console.log(error);
  }
};

export const crearNoticia = async (data) => {
  try {
    const res = await API.post(`news/create`, data);
    console.log(data);
    return res.data.newNoticia;
  } catch (error) {
    console.log(error);
  }
};

export const editNoticia = async (data, id) => {
  _.assign(data, { id });
  try {
    const res = await API.post(`news/update/`, data);
    return res.data.newsReceived;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNoticia = async (id) => {
  try {
    const res = await API.get(`news/delete/${id}`);
    console.log({ res: res.data  });
    return res.data.newsReceived;
  } catch (error) {
    console.log(error);
  }
};
