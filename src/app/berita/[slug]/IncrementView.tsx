"use client"

import { incrementViewCount } from "@/app/lib/pots"
import { useEffect, useState } from "react"
import { CgEye } from "react-icons/cg"

export default function IncrementView({ prevView, slug }: { prevView: number, slug: string }) {
    const [view, setView] = useState<number>(prevView)

    useEffect(() => {
        const fetchData = async () => {
            const userIp = await fetch('https://api.ipify.org?format=json').then(res => res.json()).then(data => data.ip)
            const storedIp = localStorage.getItem('userIp')
            const storedSlug = localStorage.getItem('slug')

            if (storedIp !== userIp || storedSlug !== slug) {
            const updateView = await incrementViewCount(slug)
            if (updateView !== null) {
                setView(updateView)
            }
            localStorage.setItem('userIp', userIp)
            localStorage.setItem('slug', slug)
            }
        }
        fetchData()
    }, [prevView, slug])

    return (
        <div className="flex items-center gap-2 ">
            <CgEye className="inline-block" />
            <span className="font-light">{view} dilihat</span>
        </div>
    )
}