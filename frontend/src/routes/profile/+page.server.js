import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  const token = cookies.get("jwt");

  if (!token) {
    throw redirect(307, "/login");
  }
}
