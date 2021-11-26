import { ICategory } from "./category.d";

export interface IPost {
  title: string;
  slug: string;
  thumbnail: {
    url: string;
  };
  createdAt: string;
  categories: ICategory[];
  content: {
    html: string;
  };
}
