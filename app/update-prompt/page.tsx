"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const getPromptDetails = async () => {
    try {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    } catch (e) {
      console.log("e", e);
    }
  };

  const updatePrompt = async (e) => {
    e.preventDefault();

    if (!promptId) {
      return alert("Prompt ID not found");
    }

    try {
      setSubmitting(true);
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
        type="Update"
        post={post}
        submitting={submitting}
        setPost={setPost}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default UpdatePrompt;