import { API_KEY } from "$env/static/private";
import { PUBLIC_API_URI } from "$env/static/public";

export async function load({ cookies }) {
  const response = await fetch(`${PUBLIC_API_URI}/products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  const products = await response.json();
  return { products, token: cookies.get("jwt") };
}
