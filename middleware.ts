import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin", // login page ka path
  },
});

export const config = { matcher: ["/protected-route"] }; // jis route ko protect karna hai
