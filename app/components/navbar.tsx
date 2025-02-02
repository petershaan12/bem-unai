import { Link } from "@remix-run/react";
import dataBem from "../../data_bem.json";

export function Navbar() {
  const handleClick = () => {
    const dropdowns = document.querySelector(".dropdown");
    dropdowns?.removeAttribute("open");
  };

  return (
    <div className="navbar bg-primary px-5 md:px-20 fixed top-0 z-20 md:h-20 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="font-semibold text-2xl flex items-center gap-5">
          <img
            src="/bem-logo.svg"
            alt="Logo"
            className="w-8 h-8 ml-4 md:ml-0 md:h-10 md:w-10"
          />
          <span className="hidden md:block">BEM Unai</span>
        </Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost block md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>{" "}
          </svg>
        </button>
      </div>
      <div className="flex-none hidden md:block">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details id="dropdown" className="dropdown">
              <summary>Pemerintahan</summary>
              <ul className="menu xl:menu-horizontal dropdown-content bg-primary rounded-box lg:min-w-max right-0 border border-secondary/50">
                {Array.from(new Set(dataBem.map((data) => data.type))).map(
                  (type) => {
                    const item = dataBem.find((data) => data.type === type);
                    const imageSrc = item
                      ? `/icon/${item.image}.svg`
                      : "/icon/default.svg";
                    return (
                      <li key={type} className="flex items-center">
                        <div className="flex items-center gap-4">
                          <img src={imageSrc} alt={type} className="w-7 h-7" />
                          <span className="text-sm text-white">
                            {item ? item.type : "Tidak ada data"}
                          </span>
                        </div>
                        <ul className="-ml-2 max-h-80 overflow-y-auto custom-scroll">
                          {dataBem
                            .filter((data) => data.type === type)
                            .map((data) => (
                              <li
                                key={data.abbreviation}
                                className="hover:bg-secondary/50 hover:rounded-lg"
                              >
                                <Link
                                  to={`/pemerintahan/${data.abbreviation}`}
                                  onClick={handleClick}
                                >
                                  {data.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </li>
                    );
                  }
                )}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Audit</summary>
              <ul className="p-2">
                <li>
                  <p>Submenu 1</p>
                </li>
                <li>
                  <p>Submenu 2</p>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link to="/info">Informasi</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
