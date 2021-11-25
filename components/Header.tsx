import { FC, useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { graphCms } from "../lib/graphCms";
import { ICategory } from "../@interfaces";

import Style from "../styles/Header.module.css";

const Header: FC = () => {
  const [categoryLinks, setCategoryLinks] = useState<ICategory[]>([]);

  const getCategories = async (): Promise<void> => {
    const { categories } = await graphCms.request(`
    query MyQuery {
      categories {
        name
        color {
          css
        }
      }
    }
  `);
    setCategoryLinks(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <header className="border-b border-white border-opacity-30 py-5 ">
      <div className="flex justify-between items-center max-w-5xl m-auto px-2">
        <Link href="/">
          <a className={classNames(Style.logo, "text-4xl")}>ShareIt.</a>
        </Link>

        <ul className="flex gap-7 capitalize font-thin">
          {categoryLinks.map((category) => (
            <li key={category.name}>
              <Link href={category.name}>
                <a style={{ color: category.color.css }}>{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
