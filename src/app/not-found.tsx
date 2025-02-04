export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
            <h2 className="text-5xl">404 | Not Found</h2>
            <p className="text-sm">Maaf, Halaman yang anda cari tidak tersedia</p>
            <a
                className="flex w-full items-center justify-center gap-2 transition-all hover:gap-5"
                href="/"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-left h-4 w-4"
                    aria-hidden="true"
                >
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                </svg>
                Kembali
            </a>
        </div>
    );
}