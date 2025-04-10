import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async credentials => {
        console.log("credentials: >>", credentials)

        const { email, password } = credentials;

        try {

          const login = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
            headers: {
              "Content-Type": "Application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, password })
          })

          if (login.status !== 200) {
            console.log("login.status: >>", login.status);
            return null;
          }

          const user = await login.json()

          console.log(user)

          return user

        } catch (error) {
          console.log("error: >>", error)
          return null;
        }
      }
    })
  ]
})