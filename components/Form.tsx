import React from "react";
import Link from "next/link";

interface IPost {
  prompt: string;
  tag: string;
}

interface IForm {
  type: string;
  post: IPost;
  submitting: boolean;
  setPost: (post: IPost) => void;
  handleSubmit: (e) => void;
}

const Form = (props: IForm) => {
  const { type, post, submitting, setPost, handleSubmit } = props;
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your AI prompts with the World.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) =>
              setPost({
                ...post,
                prompt: e.target.value,
              })
            }
            required
            placeholder="Write your prompt here..."
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">(#product, #web, #idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) =>
              setPost({
                ...post,
                tag: e.target.value,
              })
            }
            placeholder="#tag"
            className="form_input"
            required
          />
        </label>

        <span className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500-text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </span>
      </form>
    </section>
  );
};

export default Form;
