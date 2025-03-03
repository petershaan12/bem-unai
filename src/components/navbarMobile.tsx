"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
    user: any | null;
    dataBem: any[];
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavbarMobile({ user, dataBem, isMobileMenuOpen, setIsMobileMenuOpen }: NavbarProps) {
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
    const pathname = usePathname();
    const toggleDropdown = (key: any) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleClick = () => {
        setIsMobileMenuOpen(false);
    }

    console.log(isMobileMenuOpen);

    return (
        <div
            className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"
                } absolute top-12 left-0 w-full h-screen bg-primary p-4 z-99 overflow-auto`}
        >
            <ul className="menu menu-vertical gap-6">
                {dataBem && (
                    <li>
                        <details id="dropdown" className="dropdown">
                            <summary>Pemerintahan</summary>
                            <ul className="menu dropdown-content bg-primary">
                                {Array.from(new Set(dataBem.map((data) => data.type))).map((type) => {
                                    const item = dataBem.find((data) => data.type === type);
                                    const key = type.replace(/\s/g, "-").toLowerCase();
                                    const imageSrc = item ? `/icon/${item.image}.svg` : "/icon/default.svg";
                                    return (
                                        <li key={key} className="dropdown">
                                            <div
                                                className="flex gap-4 cursor-pointer"
                                                onClick={() => toggleDropdown(key)}
                                            >
                                                <Image src={imageSrc} alt={type} className="w-7 h-7" width={20} height={20} />
                                                <span className="text-sm text-white">
                                                    {item ? item.type : "Tidak ada data"}
                                                </span>
                                            </div>
                                            {openDropdowns[key] && (
                                                <ul className="max-h-80 overflow-y-auto custom-scroll">
                                                    {dataBem
                                                        .filter((data) => data.type === type)
                                                        .map((data) => (
                                                            <li
                                                                key={data.abbreviation}
                                                                className="hover:bg-secondary/50 hover:rounded-lg"
                                                            >
                                                                <Link
                                                                    href={`/pemerintahan/${data.abbreviation}`}
                                                                    onClick={handleClick} // Call handleClick on click
                                                                >
                                                                    {data.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </details>
                    </li>
                )}
                <li className={pathname === "/portal" ? "text-secondary" : ""}>
                    <Link href="/portal" onClick={handleClick}>Portal</Link>
                </li>
                <li className={pathname === "/berita" ? "text-secondary" : ""}>
                    <Link href="/berita" onClick={handleClick}>Informasi</Link>
                </li>
                <li className={pathname === "/contact" ? "text-secondary" : ""}>
                    <Link href="/contact" onClick={handleClick}>Kontak</Link>
                </li>
                {user && (
                    <>
                        <li className={pathname === "/kelola-pemerintahan" ? "text-secondary" : ""}>
                            <Link href="/kelola-pemerintahan" onClick={handleClick}>Kelola Pemerintahan</Link>
                        </li>
                        <li className={pathname === "/kelola-portal" ? "text-secondary" : ""}>
                            <Link href="/kelola-portal" onClick={handleClick}>Kelola Portal</Link>
                        </li>
                        <li className={pathname === "/kelola-informasi" ? "text-secondary" : ""}>
                            <Link href="/kelola-informasi" onClick={handleClick}>Kelola Informasi</Link>
                        </li>
                        <li className={pathname === "/kelola-kontak" ? "text-secondary" : ""}>
                            <Link href="/kelola-kontak">Kelola Kontak</Link>
                        </li>
                        <li className={pathname === "/profile" ? "text-secondary" : ""}>
                            <Link href="/profile" className="flex items-center gap-4" onClick={handleClick}>
                                <div className="avatar placeholder">
                                    <div className="bg-secondary text-primary w-10 rounded-full">
                                        {user.name.substring(0, 2).toUpperCase()}
                                    </div>
                                </div>
                                <p>{user.name}</p>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}
