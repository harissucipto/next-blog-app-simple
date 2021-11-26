import { FC } from "react";
import {
  GetStaticProps,
  GetStaticPropsResult,
  GetStaticPaths,
  GetStaticPathsResult,
} from "next";

import Post from "../components/Post";
import { graphCms } from "../lib/graphCms";
import { ICategory } from "../@interfaces";
import { ParsedUrlQuery } from "querystring";
import { IPost } from "../@interfaces/post.d";

interface ICategoryPageProps extends IProps {}

const CategoryPage: FC<ICategoryPageProps> = ({ posts }) => {
  return (
    <div className="my-container">
      <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2">
        {posts.reverse().map((post) => (
          <Post key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const { categories }: { categories: ICategory[] } = await graphCms.request(`
    {
      categories {
        name
      }
    }
  `);

    const paths = categories.map(({ name }) => ({ params: { name } }));

    return {
      paths,
      fallback: "blocking", // incremental static generation
    };
  };

interface IParams extends ParsedUrlQuery {
  name: string;
}

interface IProps {
  posts: IPost[];
}

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<IProps>> => {
  const { name } = context.params as IParams;

  const { posts } = await graphCms.request(
    `
    query MyQuery($name: String!) {
      posts(where: { categories_every: { name: $name }}) {
        title 
        slug
        thumbnail {
          url
        }
        categories {
          name 
          color {
            css
          }
        }
      }
    }
  `,
    { name }
  );

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};
