import { FC } from "react";
import Link from "next/link";
import classNames from "classnames";

import Style from "../styles/Header.module.css";

const Header: FC = () => {
  return (
    <header className="border-b border-white border-opacity-30 py-5 ">
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className={classNames(Style.logo, "text-4xl")}>ShareIt.</a>
        </Link>

        <ul className="flex gap-7 capitalize font-thin">
          <li>
            <Link href="/">
              <a>Category 1</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Category 1</a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
