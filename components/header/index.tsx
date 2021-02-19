import { SessionContext } from "@components/contexts/SessionContext";
import clsx from "clsx";
import { useContext, useRef, useState } from "react";
import { useClickAway } from "react-use";
import Link from "next/link";

export const Header = () => {
  const { user } = useContext(SessionContext);
  const menuRef = useRef(null);
  const [menuOpened, setMenuOpened] = useState(false);

  useClickAway(menuRef, () => {
    setMenuOpened(false);
  });

  return (
    <div className="bg-gray-100 px-8 flex justify-between items-center font-medium">
      <div className="text-2xl py-4">UberHeat</div>
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpened((prevState) => !prevState)}
          className={clsx(
            menuOpened && "bg-indigo-400 text-white",
            "focus:outline-none flex items-center space-x-6 hover:bg-indigo-400 hover:text-white py-1 pl-6 pr-1 rounded-full"
          )}
        >
          <span>{user.firstName}</span>
          <div className="bg-indigo-300 h-10 w-10 rounded-full flex justify-center items-center">
            <span className="">{user.firstName.slice(0, 1)}</span>
          </div>
        </button>
        <HeaderDropDown open={menuOpened} />
      </div>
    </div>
  );
};

type HeaderDropDownProps = { open: boolean };
const HeaderDropDown = ({ open }: HeaderDropDownProps) => {
  return (
    <div
      className={clsx(!open && "hidden", "absolute right-0 top-14 text-left")}
    >
      <div className="bg-indigo-400 p-2 text-white rounded-md">
        <Link href="/admin/dashboard">
          <a>
            <div className="hover:bg-indigo-300 px-4 py-2 rounded-md">
              Administration
            </div>
          </a>
        </Link>
        <div role="button" className="hover:bg-indigo-300 px-4 py-2 rounded-md">
          Deconnexion
        </div>
      </div>
    </div>
  );
};
