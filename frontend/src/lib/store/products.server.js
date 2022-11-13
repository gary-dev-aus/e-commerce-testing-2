import { API_KEY } from "$env/static/private";
import { PUBLIC_API_URI } from "$env/static/public";
import { writable } from "svelte/store";

export const products = writable();

export const loadProducts = async (token) => {
  const response = await fetch(`${PUBLIC_API_URI}/products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  products.set(data);
};
