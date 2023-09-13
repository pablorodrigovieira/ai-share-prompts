"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IPrompt, IUserSession } from "@utils/interfaces";

interface PromptCardInterface {
  post: IPrompt;
  handleTagClick?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const PromptCard = (props: PromptCardInterface) => {
  const { post, handleDelete, handleTagClick, handleEdit } = props;
  const [copied, setCopied] = useState("");
  const { data: session } = useSession() as unknown as IUserSession;
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {post && post.creator && post.creator.image && (
            <Image
              src={post.creator.image}
              alt="Post creator"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          )}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-600">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
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
            width={15}
            height={15}
            alt="copy icon"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick();
        }}
      >
        {post.tag}
      </p>
      {session?.user?.email === post.creator.email &&
        pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={() => handleEdit && handleEdit()}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={() => handleDelete && handleDelete()}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
