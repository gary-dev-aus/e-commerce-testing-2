import { PUBLIC_API_URI } from "$env/static/public";

export const fetchData = async (token, data, method, action) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(PUBLIC_API_URI + action, {
    method,
    headers,
    credentials: "include",
    body: JSON.stringify(Object.fromEntries(data)),
  }).catch((error) => {
    console.log(error);
  });

  const result = await response.json();
  return result;
};
