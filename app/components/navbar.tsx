import { Link } from "@remix-run/react";

export function Navbar() {
    return (
      <div className="navbar bg-primary px-5 md:px-20 fixed top-0 z-20 md:h-20 shadow-lg">
        <div className="flex-1">
          <Link
            to="/"
            className="font-semibold text-2xl flex items-center gap-5"
          >
            <img src="/bem-logo.svg" alt="Logo" className="h-10 w-10" />
            <span className="hidden md:block">BEM Unai</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Pemerintahan</a>
            </li>
            <li>
              <details>
                <summary>Audit</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
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