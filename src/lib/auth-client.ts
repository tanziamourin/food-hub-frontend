import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "https://food-hub-backend-one.vercel.app",
  //  cookies: {
  //   secure: true,
  //   sameSite: "none",
  // },
    fetchOptions: {
    credentials: "include",
  },
});
