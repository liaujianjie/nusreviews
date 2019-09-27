import { sharedHttpClient } from "./sharedHttpClient";

type AuthCredentials = {
  email: string;
  password: string;
};

export const getModule = async (moduleCode: string) => {
  const response = await sharedHttpClient.post("/users/login", {
    params: {
      module_code: moduleCode
    }
  });

  return response.data;
};
