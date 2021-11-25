import { FC, useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { graphCms } from "../lib/graphCms";

import Style from "../styles/Header.module.css";

interface Icategory {
  color: {
    css: string;
  };
  name: string;
}

const Header: FC = () => {
  const [categoryLinks, setCategoryLinks] = useState<Icategory[]>([]);

  const getCategories = async () => {
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
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className={classNames(Style.logo, "text-4xl")}>ShareIt.</a>
        </Link>

        <ul className="flex gap-7 capitalize font-thin">
          {categoryLinks.map((category) => (
            <li key={category.name}>
              <Link href="/">
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
