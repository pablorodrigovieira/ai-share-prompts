"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import PromptCard from "@components/PromptCard";
import { IPrompt } from "@utils/interfaces";
import { handleError } from "@utils/errorHandler";
import { FUNCTIONS } from "@app/constants/consts";

interface IPromptCardList {
  data: IPrompt[];
  handleTagClient: () => void;
}

const PromptCardList = (props: IPromptCardList) => {
  const { data, handleTagClient } = props;
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClient}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: ChangeEvent) => {};

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/prompt");
      if (res) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      handleError(e, FUNCTIONS.FETCH_POSTS);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClient={() => {}} />
    </section>
  );
};

export default Feed;
