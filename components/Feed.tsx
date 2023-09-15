"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";
import { IPrompt } from "@utils/interfaces";
import { handleError } from "@utils/errorHandler";
import { FUNCTIONS } from "@app/constants/consts";

interface IPromptCardList {
  data: IPrompt[];
  handleTagClick: (tagName: string) => void;
}

const PromptCardList = (props: IPromptCardList) => {
  const { data, handleTagClick } = props;
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<
    undefined | ReturnType<typeof setTimeout>
  >(undefined);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item: IPrompt) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt),
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // Clear the previous timeout if it exists
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      setSearchText(e.target.value);

      let timeoutId: undefined | ReturnType<typeof setTimeout>;

      // debounce method
      timeoutId = setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500);

      setSearchTimeout(timeoutId);
    } catch (e: any) {
      handleError(e, FUNCTIONS.HANDLE_SEARCH_CHANGE);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/prompt");
      if (res) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e: any) {
      handleError(e, FUNCTIONS.FETCH_POSTS);
    }
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="search"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
