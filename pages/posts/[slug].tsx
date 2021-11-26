import { GetStaticProps, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { FC } from "react";
import { IPost } from "../../@interfaces";
import { graphCms } from "../../lib/graphCms";

interface IPostProps extends IProps {}

const SinglePost: FC<IPostProps> = ({ post }) => {
  return (
    <div className="my-container">
      <h1>{post?.title}</h1>
    </div>
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