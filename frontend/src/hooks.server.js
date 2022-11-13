import { PUBLIC_API_URI } from "$env/static/public";

export async function handle({ event, resolve }) {
  const token = event.cookies.get("jwt");
  if (!token) {
    return resolve(event);
  }
  const response = await fetch(PUBLIC_API_URI + "/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();

  if (user) {
    event.locals.user = user.user;
  }

  return resolve(event);
}
