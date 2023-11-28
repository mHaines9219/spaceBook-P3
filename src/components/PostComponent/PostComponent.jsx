import React, { useEffect, useState } from "react";
import "./PostComponent.css";
import { useParams } from "react-router-dom";
import * as postsAPI from "../../utilities/posts-api";
import PostLI from "../PostsLI/PostLI";

export default function PostComponent({ myProfile, otherProfile }) {
  let { id } = useParams();
  // const [posts, setPosts] = useState([]);

  const profileToUse = myProfile || otherProfile;

  useEffect(() => {
    if (profileToUse) {
      setPagePosts(profileToUse.posts || []);
    }
  }, [myProfile, otherProfile]);

  console.log(`The id ${id}`)

  // Using pagePosts as it should load the posts for the profile/:id-- not just the logged in user's profile
  const [pagePosts, setPagePosts] = useState([]);

  // Function to retrieve all posts for the user's Profile page
  useEffect(function () {
    async function getPagePosts() {
      console.log("get profile page's Posts");
      // Get the array of posts from the page profile's posts array

      const posts = await postsAPI.getPosts(myProfile._id);
      // console.log(posts);
      // The controller then populates an array of posts documents from the profile's posts array
      // Set pagePosts state with the array of posts documents returned to the posts variable
      setPagePosts(posts);
    }
    getPagePosts();
  }, [myProfile]);
  
  // Handle inputs to new post textbox
  const [newPost, setNewPost] = useState({
    content: "",
    author: myProfile._id,
    // For when routing works, pass the target profile, but don't pass to Mongoose
    // target: id
  });
  function handleChange(evt) {
    const newPostContent = { ...newPost, [evt.target.name]: evt.target.value };
    setNewPost(newPostContent);
  }

  // Handle submitting new post
  async function handleSubmit(evt) {
    evt.preventDefault();
    const submitNewPost = await postsAPI.createPost(myProfile._id, newPost);
    console.log("Sending data to utilities");
    await setPagePosts(...pagePosts, submitNewPost);
    setNewPost({
      content: "",
      author: myProfile._id,
      // For when routing works, pass the target profile, but don't pass to Mongoose
      // target: id
    });
  }

  // Display page's posts
  const displayPosts = pagePosts.map((p, idx) => (<PostLI key={idx} post={p.content} author={p.author}/>))

  return (
    <>
      {myProfile ? (
        <div id="post-component-container">
          <div id="create-post-container">
            <form 
            onSubmit={handleSubmit} method="post" id="user-post-form-container">
              <label >Type your new post here:</label>
              <input
                id="user-post-form"
                name="content"
                type="text"
                placeholder="What's on your mind?" value={newPost.content} onChange={handleChange}
              ></input>
              <button>POST</button>
            </form>
          </div>
          TIMELINE
          <div id="old-posts-container">
            OLD POSTS
            <ul id="old-posts-list">
              {displayPosts}
            </ul>
          </div>
        </div>
      ) : (
        <div id="post-component-container">
          TIMELINE
          <div id="old-posts-container">
            OLD POSTS
            <ul id="old-posts-list">
              {/* Iterate over old posts */}
              {displayPosts}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
