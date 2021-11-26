import { ICategory } from "./category.d";

export interface IPost {
  title?: string;
  slug?: string;
  thumbnail?: {
    url: string;
  };
  createdAt: Date;
  categories?: ICategory[];
  content: {
    html: string;
  };
}
