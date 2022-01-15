import axios from "axios";
import _ from "lodash";
import { baseURL } from "../utils/constants";
import API from "./instance";

export const getContactos = async () => {
  try {
    const res = await API.get("contact");
    return res.data.contactReceived;
  } catch (error) {
    console.log(error);
  }
};

export const deleteContacto = async (id) => {
  try {
    const res = await API.get(`contact/delete/${id}`);
    console.log({ res: res.data });
    return res.data.formReceived;
  } catch (error) {
    console.log(error);
  }
};
