import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const updatePage = (pgeName) => {
  return {
    type: pgeName
  };
};
