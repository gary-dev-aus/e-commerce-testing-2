import { redirect } from "@sveltejs/kit";

export async function load() {
  throw redirect(302, "/");
}

export const actions = {
  default({ cookies }) {
    cookies.set("jwt", "", {
      path: "/",
      expires: new Date(0),
    });

    throw redirect(302, "/");
  },
};
