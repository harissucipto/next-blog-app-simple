import { GetStaticProps, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { FC } from "react";
import { format } from "date-fns";
import Head from "next/head";

import Style from "../../styles/SinglePost.module.css";
import { IPost } from "../../@interfaces";
import { graphCms } from "../../lib/graphCms";

interface IPostProps extends IProps {}

const SinglePost: FC<IPostProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>shareIt. {post.title}</title>
      </Head>
      <div className="my-container">
        <div className="p-5 ">
          <h1 className="text-3xl font-bold text-red-300 capitalize">
            {post.title}
          </h1>
          <h3 className="pt-2 pb-7 ">
            {format(new Date(post.createdAt), "EEEE, dd, yyy")}
          </h3>
          <div
            className={Style.formatter}
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </div>
      </div>
    </>
  );
};

export default SinglePost;

// definisikan semua path yang akan di render menjadi html di build time
export async function getStaticPaths() {
  // mendapatkan semua path slug untuk dibuat halaman
  const { posts }: { posts: IPost[] } = await graphCms.request(`
    {
      posts {
        slug
      }
    }
  `);
  const paths = posts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: "blocking", // jangan generate semua cuma generate yang populer
  };
}

interface IProps {
  post: IPost;
}
interface IParams extends ParsedUrlQuery {
  slug: string;
}
export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<IProps>> => {
  const { slug } = context.params as IParams;

  const { post }: IProps = await graphCms.request(
    `
    query SinglePost($slug:String!) {
      post(where: {slug: $slug}) {
        title
        createdAt
        content {
          html
        }
      }
    }
  `,
    { slug }
  );

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};
