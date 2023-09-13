"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { IPrompt, IUserSession } from "@utils/interfaces";

const MyProfile = () => {
  const { data: session } = useSession() as unknown as IUserSession;
  const [posts, setPosts] = useState<IPrompt[]>([]);
  const router = useRouter();

  const handleEdit = (post: IPrompt) => {
    try {
      router.push(`/update-prompt?id=${post._id}`);
    } catch (e) {
      console.log("e", e);
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
    } catch (e) {
      console.log("e", e);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user.id}`);
      if (res) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    if (session?.user.id) {
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
