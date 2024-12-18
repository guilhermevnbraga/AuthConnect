"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PasswordInput from "@/app/ui/passwordInput";
import ErrorButton from "@/app/ui/errorButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="flex flex-col justify-evenly h-full items-center w-full">
            <h1 className="text-5xl font-bold">Log in</h1>
            <div className="flex flex-col w-full justify-center items-center">
                <form className="flex flex-col w-full landscape:w-3/5 md:w-5/6">
                    <label
                        htmlFor="email"
                        className="md:text-lg mb-2 ml-3 text-xs font-medium"
                    >
                        Email
                    </label>
                    <div className="shadow-lg flex items-center justify-between border-solid border-2 rounded-3xl border-[#2d85c3] bg-white mb-6 px-2 w-full">
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type="text"
                            id="email"
                            className="w-11/12 py-2 px-3 bg-transparent focus:outline-0 placeholder:text-xs landscape:placeholder:text-base"
                            placeholder="email@email.com"
                            autoComplete="off"
                        />
                        <EnvelopeIcon
                            className="mr-3 w-6 h-6"
                        />
                    </div>
                    <PasswordInput
                        label="Password"
                        onChange={setPassword}
                    ></PasswordInput>
                    <ErrorButton error={error}></ErrorButton>
                </form>
                <button
                    onClick={async () => {
                        const response = await signIn("credentials", {
                            email: email,
                            password: password,
                            redirect: false,
                        });

                        if (response && response.status === 401) {
                            setError("Invalid email or password");
                        } else {
                            router.push("/home");
                        }
                    }}
                    className="mt-8 mb-6 shadow-lg w-full landscape:w-3/5 bg-[#2d85c3] w-7/12 rounded-3xl p-2 text-white md:text-base lg:text-lg xl:text-xl md:w-4/5 font-medium hover:bg-white hover:text-[#2d85c3] border-solid border-2 border-[#2d85c3]"
                >
                    Login
                </button>
            </div>
            <Link href="./register">
                <span className="font-light md:text-base text-xs hover:underline cursor-pointer">
                    Doesn&apos;t have an account yet? Sign up
                </span>
            </Link>
        </div>
    );
}
