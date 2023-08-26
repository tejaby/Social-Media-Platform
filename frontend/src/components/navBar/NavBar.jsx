// Libraries
import { NavLink } from "react-router-dom";

// react

import { useState } from "react";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";

function navBar() {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <nav className="flex flex-wrap justify-between items-center border-b-2 p-6">
      <div className="flex justify-between items-center mr-6">
        <UseSvgLoader name="logo" options={{ width: "48px", height: "48px" }} />
        <span className="font-semibold text-xl tracking-tight">BuscoSexo</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2" onClick={handleToggle}>
          <UseSvgLoader
            name="menu"
            options={{ with: "48px", height: "48px" }}
          />
        </button>
      </div>
      <div
        className={`${
          show ? "block" : "hidden"
        } flex-grow w-full lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <NavLink
            to="/"
            className="block mr-4 mt-4 lg:inline-block lg:mt-0 hover:text-hoverEffect"
          >
            home
          </NavLink>
          <NavLink
            to="/post"
            className="block mr-4 mt-4 lg:inline-block lg:mt-0 hover:text-hoverEffect"
          >
            post
          </NavLink>
          <NavLink
            to="/account"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-hoverEffect"
          >
            account
          </NavLink>
        </div>
        <div>
          <a
            href="#"
            className="inline-block text-sm border rounded mt-4 px-4 py-2 border-black hover:border-transparent hover:text-white hover:bg-background lg:mt-0"
          >
            Descargar porno
          </a>
        </div>
      </div>
    </nav>
  );
}

export default navBar;
