"use client";

import Link from "next/link";
import PasswordInput from "@/app/ui/passwordInput";
import ErrorButton from "@/app/ui/errorButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Page() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [compareError, setCompareError] = useState("");
    let con = true;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName) {
            setFirstNameError("Please enter your first name");
            con = false;
        }

        if (!lastName) {
            setLastNameError("Please enter your last name");
            con = false;
        }

        if (!email) {
            setEmailError("Please enter your email");
            con = false;
        }

        if (!password) {
            setPasswordError("Please enter your password");
            con = false;
        }

        if (!con) {
            con = true;
            return;
        }

        if (
            emailError ||
            passwordError ||
            compareError ||
            firstNameError ||
            lastNameError
        ) {
            return;
        }

        const userName = firstName.trim() + " " + lastName.trim();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_DB_URL}/user/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: userName,
                    email: email,
                    password: password,
                }),
                credentials: "include",
            }
        );

        const data = await response.json();

        if (response.status == 200) {
            router.push("/account/login");
        } else {
            setEmailError(data.error);
        }
    };

    return (
        <div className="flex flex-col w-full h-full justify-evenly items-center">
            <h1 className="md:text-5xl text-3xl font-bold mb-6">Sign Up</h1>
            <div className="flex flex-col w-full justify-center items-center">
                <form className="flex flex-col w-full md:w-3/4">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col w-[48%]">
                            <label
                                htmlFor="first-name"
                                className="md:text-base ml-3 text-xs font-medium"
                            >
                                First Name
                            </label>
                            <input
                                onChange={(e) => {
                                    setFirstNameError("");
                                    setFirstName(e.target.value);
                                }}
                                type="text"
                                id="first-name"
                                placeholder="First Name"
                                className="shadow-lg flex items-center justify-between border-solid border-2 rounded-3xl border-[#2d85c3] bg-white px-3 w-full w-11/12 py-2 bg-transparent focus:outline-0 placeholder:text-xs landscape:placeholder:text-base"
                            />
                            <ErrorButton error={firstNameError}></ErrorButton>
                        </div>
                        <div className="flex flex-col w-[48%]">
                            <label
                                htmlFor="last-name"
                                className="md:text-base ml-3 text-xs font-medium"
                            >
                                Last Name
                            </label>
                            <input
                                onChange={(e) => {
                                    setLastNameError("");
                                    setLastName(e.target.value);
                                }}
                                type="text"
                                id="last-name"
                                placeholder="Last Name"
                                className="shadow-lg flex items-center justify-between border-solid border-2 rounded-3xl border-[#2d85c3] bg-white px-3 w-full w-11/12 py-2 bg-transparent focus:outline-0 placeholder:text-xs landscape:placeholder:text-base"
                            />
                            <ErrorButton error={lastNameError}></ErrorButton>
                        </div>
                    </div>
                    <label
                        htmlFor="email"
                        className="md:text-base ml-3 text-xs font-medium"
                    >
                        Email
                    </label>
                    <div className="shadow-lg flex items-center justify-between border-solid border-2 rounded-3xl border-[#2d85c3] bg-white px-2 w-full">
                        <input
                            onChange={(e) => {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (emailRegex.test(e.target.value)) {
                                    setEmailError("");
                                } else {
                                    setEmailError("Please enter a valid email");
                                }

                                if (e.target.value === "") {
                                    setEmailError("");
                                }

                                setEmail(e.target.value);
                            }}
                            type="text"
                            id="email"
                            className="w-11/12 py-2 px-3 bg-transparent focus:outline-0 placeholder:text-xs landscape:placeholder:text-base"
                            placeholder="email@email.com"
                            autoComplete="off"
                        />
                        <EnvelopeIcon className="mr-3 w-6 h-6 text-black" />
                    </div>
                    <ErrorButton error={emailError}></ErrorButton>
                    <PasswordInput
                        label="Password"
                        onChange={(e) => {
                            if (!/(?=.*[a-z])/.test(e)) {
                                setPasswordError(
                                    "Password must contain at least one lowercase letter"
                                );
                            } else if (!/(?=.*[A-Z])/.test(e)) {
                                setPasswordError(
                                    "Password must contain at least one uppercase letter"
                                );
                            } else if (!/(?=.*\d)/.test(e)) {
                                setPasswordError(
                                    "Password must contain at least one number"
                                );
                            } else if (e.length < 8) {
                                setPasswordError(
                                    "Password must be at least 8 characters long"
                                );
                            } else {
                                setPasswordError("");
                            }

                            if (e === "") {
                                setPasswordError("");
                            }

                            setPassword(e);
                        }}
                    ></PasswordInput>
                    <ErrorButton error={passwordError}></ErrorButton>
                    <PasswordInput
                        label="Confirm Password"
                        onChange={(e) => {
                            if (e !== password) {
                                setCompareError("Passwords do not match");
                            }

                            if (e === "" || e === password) {
                                setCompareError("");
                            }
                        }}
                    ></PasswordInput>
                    <ErrorButton error={compareError}></ErrorButton>
                </form>
                <button
                    onClick={handleSubmit}
                    className="active:scale-95 mt-8 mb-6 shadow-lg w-full md:w-3/4 bg-[#2d85c3] rounded-3xl p-2 text-white md:text-base lg:text-lg xl:text-xl font-medium hover:bg-white hover:text-[#2d85c3] border-solid border-2 border-[#2d85c3]"
                >
                    Sign Up
                </button>
            </div>
            <Link href="./login">
                <span className="font-light md:text-base text-xs hover:underline cursor-pointer">
                    Already have an account?
                </span>
            </Link>
        </div>
    );
}
