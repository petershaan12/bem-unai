"use client"

import { useActionState } from "react"
import { login } from "./actions"

export function LoginForm() {
    const [state, loginAction, pending] = useActionState(login, undefined)
    return (
        <form action={loginAction} className="space-y-4 mb-12 w-full sm:w-[400px]">
            <div>
                <label className="label">
                    <span className="text-base label-text">Email</span>
                </label>
                <input type="email" id="email" name="email" placeholder="Email Address" className="w-full input input-bordered input-secondary text-primary" />
            </div>

            <div>
                <label className="label">
                    <span className="text-base label-text">Password</span>
                </label>
                <input id="password" type="password" name="password" placeholder="Enter Password" className="w-full input input-bordered input-secondary text-primary" />
            </div>

            <div className="flex justify-center">
                {pending ? <span className="loading loading-spinner loading-xl text-center mt-5"></span> :
                    <button className="bg-gradient-to-r w-full from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                        Login
                    </button>
                }
            </div>
            {state?.errors?.message && (
                <p className="text-red-500 mt-2">{state.errors.message}</p>
            )}
        </form>
    )
}

