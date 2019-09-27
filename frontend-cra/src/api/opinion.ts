import { sharedHttpClient } from "./sharedHttpClient";

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
