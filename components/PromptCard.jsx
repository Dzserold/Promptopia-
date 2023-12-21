"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { handleClientScriptLoad } from "next/script";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 4000);
  };

  return (
    <article className="prompt_card">
      <section className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={
              post.creator?.image
                ? post.creator.image
                : "/assets/images/logo.svg"
            }
            alt="user_image"
            height={40}
            width={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator?.username ? post.creator.username : "Unknown"}
            </h3>
            <p className="font-inner text-sm text-gray-500">
              {post.creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </section>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user?.id === post.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter cursor-pointer green_gradient text-sm"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter cursor-pointer orange_gradient text-sm"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </article>
  );
};

export default PromptCard;
