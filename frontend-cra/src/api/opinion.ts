import { sharedHttpClient } from "./sharedHttpClient";
import { OPINION_TYPE } from "../constants/type";

type UpdateOpinionPayload = {
  token: string;
  description: string;
};

export const updateOpinion = async ({
  token,
  description
}: UpdateOpinionPayload) => {
  const response = await sharedHttpClient.post(
    "/edit_opinion",
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

type GetOpinionPayload = {
  id: number;
};

export const getOpinion = async ({ id }: GetOpinionPayload) => {
  const response = await sharedHttpClient.get(`/opinions/${id}`);
  return response.data as OPINION_TYPE;
};
