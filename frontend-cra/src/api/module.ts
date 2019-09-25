import { sharedHttpClient } from "./sharedHttpClient";

export const getModule = async (moduleCode: string) => {
  const response = await sharedHttpClient.get("/modules/" + moduleCode);

  return response.data;
};
