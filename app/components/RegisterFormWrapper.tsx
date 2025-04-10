'use client'

import { useActionState } from "react";
import { register } from "../helpers/actions";
import Link from "next/link";
import { FaAt, FaKey } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import { IoPerson } from "react-icons/io5";

export type CreateStateForm = {
    errors?: {
        name?: string[],
        username?: string[],
        email?: string[],
        password?: string[]
    },
    message: string | null
};

const RegisterFormWrapper = () => {

    const initialState: CreateStateForm = { message: null, errors: {} }
    const [state, formAction] = useActionState(register, initialState)


    return (
        <form action={formAction} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className="text-center text-2xl color-black">Registrar usuario</h1>
                <div className="w-full">
                    <div className="flex flex-col w-full">
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                            Name
                        </label>
                        <div className="relative">
                            <input
                                name="name"
                                id="name"
                                type="text"
                                className="bg-white hover:bg-slate-200 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter your name" />
                            <IoPerson className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {state?.errors?.name && <p className="text-red-600">{state?.errors?.name}</p>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                name="username"
                                id="username"
                                type="text"
                                className="bg-white hover:bg-slate-200 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter your username" />
                            <VscAccount className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {state?.errors?.username && <p className="text-red-600">{state?.errors?.username}</p>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className="bg-white hover:bg-slate-200 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter your email" />
                            <FaAt className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {state?.errors?.email && <p className="text-red-600">{state?.errors?.email}</p>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                            Passowrd
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                id="password"
                                type="password"
                                className="bg-white hover:bg-slate-200 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter your passowrd" />
                            <FaKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {state?.errors?.password && <p className="text-red-600">{state?.errors?.password}</p>}
                        {state?.message && <p className="text-red-600">{state?.message}</p>}
                    </div>
                </div>
                <div className="flex h-10 w-full mt-5 items-center justify-center rounded-lg bg-blue-600 px-4 text-md font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    <button type="submit">Registrar</button>
                </div>
                <p className="mt-[10px] w-full text-center">Do you have an account? <Link className="text-blue-600 hover:text-blue-400" href={'/login'}>Sign In</Link></p>
            </div>
        </form>

    );
};

export default RegisterFormWrapper;