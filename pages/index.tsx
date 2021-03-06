import { FC } from "react";
import Head from "next/head";

import Post from "../components/Post";
import { graphCms } from "../lib/graphCms";
import { IPost } from "../@interfaces";

interface IndexProps {
  posts: IPost[];
}

const index: FC<IndexProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>shareIt. | Welcome to shareit</title>
      </Head>
      <div className="my-container">
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2">
          {posts.reverse().map((post) => (
            <Post key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const { posts } = await graphCms.request(`
   {
      posts {
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
  `);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
