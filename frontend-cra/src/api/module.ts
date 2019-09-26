import { sharedHttpClient } from "./sharedHttpClient";
import { Response } from "express";

export const getModule = async (moduleCode: string) => {
  try {
    let response = await sharedHttpClient.get("/modules/" + moduleCode);
    return response.data;
  } catch (error) {
    return error;
  }
};
