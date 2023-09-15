"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { handleError } from "@utils/errorHandler";
import { FUNCTIONS } from "@app/constants/consts";

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
      const getPromptDetails = async () => {
        try {
          const response = await fetch(`/api/prompt/${promptId}`);
          const data = await response.json();
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        } catch (e) {
          handleError(e, FUNCTIONS.GET_PROMPT_DETAILS);
        }
      };
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e: FormEvent) => {
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
      handleError(e, FUNCTIONS.UPDATE_PROMPT);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      submitting={submitting}
      setPost={setPost}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
