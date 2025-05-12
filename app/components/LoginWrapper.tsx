'use client'

import Link from "next/link";
import { autenticate } from "../helpers/actions";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { FaExclamationCircle } from "react-icons/fa";
import { FaAt, FaKey } from "react-icons/fa6";

export type FormState =
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

const LoginWrapper = () => {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
    const [errorMessage, actionForm, pending] = useActionState(autenticate, undefined)

    return (
        <>
            <form className="space-y-3" action={actionForm}>
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
                    <div className="w-full">
                        <div>
                            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                />
                                <FaAt className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                            {errorMessage?.errors?.email && <p className="text-sm text-red-500 mt-2 mb-[-10px]">{errorMessage.errors.email}</p>}
                        </div>
                        <div className="mt-4">
                            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                />
                                <FaKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                            {errorMessage?.errors?.password && <p className="text-sm text-red-500 mt-2">{errorMessage.errors.password}</p>}
                        </div>
                    </div>
                    <input type="hidden" name="redirectTo" value={callbackUrl} />
                    <button
                        type="submit"
                        className="flex h-10 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 mt-4 w-full"
                        aria-disabled={pending}
                    >
                        Log in
                    </button>


                    {errorMessage?.message && (
                        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                            <FaExclamationCircle className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage?.message}</p>
                        </div>
                    )}

                    <p className="mt-3">Dont have an account yet? <Link className="text-blue-500" href={'/register'}>Register</Link></p>
                </div>
            </form>
        </>
    );
};

export default LoginWrapper;