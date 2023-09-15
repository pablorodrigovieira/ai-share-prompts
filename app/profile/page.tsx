"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { IPrompt, IUserSession } from "@utils/interfaces";
import { handleError } from "@utils/errorHandler";
import { FUNCTIONS } from "@app/constants/consts";

const MyProfile = () => {
  const { data: session } = useSession() as unknown as IUserSession;
  const [posts, setPosts] = useState<IPrompt[]>([]);
  const router = useRouter();

  const handleEdit = (post: IPrompt) => {
    try {
      router.push(`/update-prompt?id=${post._id}`);
    } catch (e: any) {
      handleError(e, FUNCTIONS.HANDLE_EDIT);
    }
  };

  const handleDelete = async (post: IPrompt) => {
    try {
      const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt?",
      );

      if (hasConfirmed) {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
      }

      const filteredPosts = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPosts);
    } catch (e: any) {
      handleError(e, FUNCTIONS.HANDLE_DELETE);
    }
  };

  useEffect(() => {
    if (session?.user.id) {
      const fetchUserPosts = async () => {
        try {
          const res = await fetch(`/api/users/${session?.user.id}/posts`);
          if (res) {
            const data = await res.json();
            setPosts(data);
          }
        } catch (e: any) {
          handleError(e, FUNCTIONS.FETCH_USER_POSTS);
        }
      };
      fetchUserPosts();
    }
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your profile..."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
