"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClient }) => {
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

  const handleSearchChange = (e) => {};

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/prompt");
      if (res) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      console.log("e", e);
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
