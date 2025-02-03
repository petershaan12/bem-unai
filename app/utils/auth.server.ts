import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";
import { prisma } from "./prisma.server";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not defined");
}

const authenticator = new Authenticator<any>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
    let password = form.get("password") as string;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("you entered a wrong email");
    }

    const passwordMatch = user.password as string === password;

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  }),
  "user-pass"
);

export { authenticator };
