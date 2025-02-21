"use client"

import { useActionState, useEffect } from "react"
import { contact } from "./actions"
import { toast } from "react-toastify";

export function ContactForm() {
    const [state, contactAction, pending] = useActionState(contact, undefined)

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success.message, {
                position: "top-right",
                autoClose: 3000,
                theme:"dark"
            });
        } else if (state?.errors?.message) {
            toast.error(`Error: ${state.errors.message}`);
        }
    }, [state]);
        
    return (
        <form action={contactAction} className="space-y-5 mb-12 w-full sm:w-[600px]">
            <div>
                <label className="label">
                    <span className="text-base label-text">Nama</span>
                </label>
                <input type="name" id="name" name="name" required placeholder="Anonymous" className="text-sm w-full input bg-secondary/5 text-white focus:outline-offset-0 focus:outline-secondary/50 focus:border-none" />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Email</span>
                </label>
                <input type="email" id="email" name="email" required placeholder="Email Address" className="text-sm w-full input bg-secondary/5 text-white focus:outline-offset-0 focus:outline-secondary/50 focus:border-none" />
            </div>

            <div>
                <label className="label">
                    <span className="text-base label-text">Pesan</span>
                </label>
                <textarea id="message" name="message" required placeholder="Your message" className="textarea textarea-md  w-full h-[200px]  bg-secondary/5 text-white focus:outline-offset-0 focus:outline-secondary/50 focus:border-none" />
            </div>

            <div className="flex justify-center mt-12">
                {pending ? <span className="loading loading-spinner loading-xl text-center mt-5"></span> :
                    <button className="bg-gradient-to-r w-full from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                        Kirim
                    </button>
                }
            </div>
            {state?.errors?.message && (
                <p className="text-red-500 mt-2">{state.errors.message}</p>
            )}
        </form>
    )
}

