import NextAuth from "next-auth";
import { authConfig } from "./app/authconfig";

function myNextAuth(myConfig = { collback: { authorized() { return 6 + 8 } } }) {
  const es = 9;
  const authorizedData = myConfig.collback.authorized() + es
  function auth() { return authorizedData }
  return { auth, es, closureEs() { return es } }
}
const { auth, closureEs, es } = myNextAuth()
console.log(auth(), closureEs(), es);

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
