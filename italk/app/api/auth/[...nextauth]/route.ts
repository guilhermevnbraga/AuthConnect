import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    pages: {
        signIn: "/account/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_DB_URL}/user/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password,
                            }),
                            credentials: "include",
                        }
                    );

                    const data = await response.json();
                    if (response.status == 200) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("erro:\n\n", error);
                    return null;
                }
            },
        }),
    ],
});

export { handler as GET, handler as POST };
