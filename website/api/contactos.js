import axios from "axios";
import _ from "lodash";
import { baseUrl } from "../utils/constants";
import { tokenweb } from "../utils/constants";
export const crearContacto = async (data) => {
  const url = `${baseUrl}api/v1/contact/create`;
  try {
    const res = await axios({
      method: "post",
      url,
      headers: {
        'token':tokenweb
      },
      data
    });
    return res.data.newContact;
  } catch (error) {
    console.log(error);
  }
};
