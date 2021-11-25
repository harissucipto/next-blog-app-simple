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
        <div
          className=" relative h-80 cursor-pointer transform hover:scale-105  transition duration-300 ease-in-out"
          style={{ border: `1px solid ${post.categories[0].color.css}` }}
        >
          <Image
            src={post.thumbnail.url}
            alt=""
            layout="fill"
            className=" absolute object-fill  sm:object-center"
          />
          <div className="flex flex-col justify-end  w-full h-full absolute bg-black bg-opacity-60   text-white z-10 ">
            <h1 className="font-medium p-8 text-2xl ">{post.title}</h1>
          </div>
          <div
            className="absolute z-10 w-1/2 top-5 -left-5 py-3 px-2"
            style={{
              backgroundColor: post.categories[0].color.css,
            }}
          >
            <h3 className="font-thin capitalize">{post.categories[0].name}</h3>
            <div
              className=" absolute opacity-60  h-5 w-5 left-0 -bottom-5"
              style={{
                clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                backgroundColor: "inherit",
              }}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
