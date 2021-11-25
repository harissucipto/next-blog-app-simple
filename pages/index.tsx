import { ReactPropTypes, FC } from "react";
import Post from "../components/Post";
import { graphCms } from "../lib/graphCms";
import { IPost } from "../@interfaces";

interface IndexProps {
  posts: IPost[];
}

const index: FC<IndexProps> = ({ posts }) => {
  return (
    <div className="max-w-5xl m-auto px-2">
      <div className="grid grid-cols-2 gap-6 py-10">
        {posts.map((post) => (
          <Post key={post.slug} post={post} />
        ))}
      </div>
    </div>
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
