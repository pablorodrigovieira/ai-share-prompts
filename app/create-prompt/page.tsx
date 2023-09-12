"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const { data: session } = useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });
      if (res && res.ok) {
        router.push("/");
      }
    } catch (e) {
      console.log("e", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        post={post}
        submitting={submitting}
        setPost={setPost}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreatePrompt;
