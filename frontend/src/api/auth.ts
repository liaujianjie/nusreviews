export const signIn = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  const headers = new Headers();
  const decodedCredentials = `${email}:${password}`;
  const encodedCredentials = btoa(decodedCredentials);
  headers.set("Authorization", `Basic ${encodedCredentials}`);
  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers
  });
  return response.json();
};
