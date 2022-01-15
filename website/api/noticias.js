import axios from "axios";
import _ from "lodash";
import { baseUrl } from "../utils/constants";
import { tokenweb } from "../utils/constants";

export const getNoticias = async () => {
  const url = `${baseUrl}api/v1/news`;
  console.log({ url });
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
};

export const getNoticiaById = async (id) => {
  const url = `${baseUrl}api/v1/news/${id}`;
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

export const getLastNoticias = async () => {
  const url = `${baseUrl}api/v1/newslast`;
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
