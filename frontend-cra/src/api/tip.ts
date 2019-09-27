import { sharedHttpClient } from "./sharedHttpClient";
import { TIP_TYPE } from "../constants/type";

type UpdateTipPayload = {
  token: string;
  description: string;
};

export const updateTip = async ({ token, description }: UpdateTipPayload) => {
  const response = await sharedHttpClient.post(
    "/edit_tip",
    {
      description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

type GetTipPayload = {
  id: number;
};

export const getTip = async ({ id }: GetTipPayload) => {
  const response = await sharedHttpClient.get(`/tips/${id}`);
  return response.data as TIP_TYPE;
};
