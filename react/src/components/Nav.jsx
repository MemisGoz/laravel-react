import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <Link to="/">
            <a class="btn btn-ghost normal-case text-xl">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="32.000000pt"
                height="32.000000pt"
                viewBox="0 0 32.000000 32.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                  fill="#DCA54C"
                  stroke="none"
                >
                  <path
                    d="M96 231 c-17 -17 -26 -36 -23 -45 3 -8 1 -17 -6 -19 -7 -2 -4 -3 5
                    -2 9 2 26 -8 38 -20 l22 -24 -28 -4 c-27 -4 -27 -4 3 -3 18 0 41 -8 53 -19
                    l22 -20 -53 -6 c-44 -5 -37 -6 36 -6 50 0 79 2 65 4 -14 3 -29 9 -35 14 -6 6
                    4 7 25 3 54 -10 55 -10 55 11 0 11 -10 24 -22 30 -12 5 -28 26 -36 46 -10 26
                    -22 38 -38 41 -13 1 -28 13 -34 26 -13 28 -16 28 -49 -7z m76 -28 c15 -3 25
                    -9 22 -14 -3 -5 0 -9 7 -9 7 0 9 -3 6 -6 -11 -11 13 -45 39 -54 40 -16 28 -31
                    -21 -28 -40 3 -52 10 -95 53 -37 37 -47 54 -40 65 7 12 12 12 22 2 10 -10 10
                    -14 -1 -21 -8 -6 -9 -11 -3 -15 15 -9 26 32 13 48 -6 7 -8 16 -4 20 4 4 12 -2
                    17 -14 5 -12 22 -24 38 -27z"
                  />
                  <path
                    d="M150 135 c19 -19 36 -35 39 -35 3 0 -10 16 -29 35 -19 19 -36 35 -39
                    35 -3 0 10 -16 29 -35z"
                  />
                  <path d="M58 243 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z" />
                </g>
              </svg>
              Shoe'Fix
            </a>
          </Link>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li tabindex="0">
              <Link to="/shop">Products</Link>
            </li>
          </ul>
          <div class="dropdown dropdown-end">
            <Link to="/cart">
              <label tabindex="0" class="btn btn-ghost btn-circle">
                <div class="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </label>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
