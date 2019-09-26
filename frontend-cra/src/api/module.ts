import { sharedHttpClient } from "./sharedHttpClient";
import { Response } from "express";

export const getModule = async (moduleCode: string) => {
  let response;
  try {
    response = await sharedHttpClient.get("/modules/" + moduleCode);
    return response.data;
  } catch (error) {
    return error;
  }
};
