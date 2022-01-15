import axios from "axios";
import _ from "lodash";
import { baseUrl } from "../utils/constants";
import { tokenweb } from "../utils/constants";

export const getMiembros = async () => {
  const url = `${baseUrl}api/v1/form`;
  try {
    const res = await axios.get(url,{
      headers: {
        'token':tokenweb
      }
    });
    return res.data.formReceived;
  } catch (error) {
    console.log(error);
  }
};

export const crearMiembro = async (data) => {
  const url = `${baseUrl}api/v1/form/create`;
  try {
    const res = await axios({
      method: "post",
      url,
      headers: {
        'token':tokenweb
      },
      data
    });
    return res.data.newFormulario;
  } catch (error) {
    console.log(error);
  }
};
