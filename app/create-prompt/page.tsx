"use client";
import React, { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { IUserSession } from "@utils/interfaces";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const { data: session } = useSession() as unknown as IUserSession;

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (session && session.user && session.user?.id) {
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
