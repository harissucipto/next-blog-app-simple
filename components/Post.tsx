import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { IPost } from "../@interfaces";

interface PostProps {
  post: IPost;
}

const Post: FC<PostProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <a>
        <div className=" relative h-80 cursor-pointer">
          <Image
            src={post.thumbnail.url}
            alt=""
            layout="fill"
            className=" absolute "
          />
          <div className="flex flex-col justify-end  w-full h-full absolute bg-black bg-opacity-60   text-white z-10 ">
            <h1 className="font-medium p-8 text-2xl ">{post.title}</h1>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
