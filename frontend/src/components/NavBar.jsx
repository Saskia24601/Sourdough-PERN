import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import React from "react";

function NavBar() {
  return (
    // Navbar component
    <div className="navbar bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50 ">
      <div className="navbar-start flex-1 pr-2">
        <Link
          to="/"
          className="font-bold p-2 font-mono tracking-widest text-3xl bg-clip-text text-transparent bg-gradient-to-tl from-primary to-secondary hover:from-secondary hover:to-primary transition-colors duration-300"
        >
          Sassy Bakes
        </Link>
      </div>
      {/* Hamburger menu for mobile */}
      <div className="navbar-center flex-1 flex justify-left lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          {/* Dropdown menu for mobile */}
          <ul
            tabIndex={0}
            className="menu menu-m dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-42"
          >
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Shop</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Desktop menu */}
      <div className="navbar-end flex-1 justify-end hidden lg:flex">
        <ul className="menu-lg menu-horizontal px-1 flex justify-center space-x-8">
          <li className="flex items-center">
            <a>About</a>
          </li>
          <li className="flex items-center">
            <a>Shop</a>
          </li>
          <li className="flex items-center">
            <a>Contact</a>
          </li>
        </ul>
      </div>
      {/* Right side of NavBar */}
      <div className="navbar-end justify-end">
        <ThemeSelector />
        <ShoppingCartIcon className="btn ml-10">Basket</ShoppingCartIcon>
      </div>
    </div>
  );
}

export default NavBar;
