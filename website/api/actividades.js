import axios from "axios";
import _ from "lodash";
import { baseUrl } from "../utils/constants";
import { tokenweb } from "../utils/constants";

export const getActividades = async () => {
  const url = `${baseUrl}api/v1/activity`;
  console.log({ url });
  try {
    const res = await axios.get(url,{
      headers: {
        'token':tokenweb
      }
    });
    console.log(res.data.newsReceived);
    return res.data.newsReceived;
  } catch (error) {
    console.log(error);
  }
};

export const getActividadById = async (id) => {
  const url = `${baseUrl}api/v1/activity/${id}`;
  try {
    const res = await axios.get(url,{
      headers: {
        'token':tokenweb
      }
    });
    return res.data.newsReceived;
  } catch (error) {
    console.log(error);
  }
}

export const getLastActividades = async () => {
  const url = `${baseUrl}api/v1/activitylast`;
  console.log({url})
  try{
    const res = await axios.get(url,{
      headers: {
        'token':tokenweb
      }
    });
    console.log(res.data.newsReceived)
    return res.data.newsReceived;
  } catch (error) {
    console.log(error);
  }
}