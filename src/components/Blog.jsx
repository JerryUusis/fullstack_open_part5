import { useState } from "react";
import Togglable from "./Togglable";
import { useRef } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [blogLikes, setBlogLikes] = useState(blog.likes);
  const blogRef = useRef();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleUpdate = async () => {
    try {
      const newLikes = blogLikes + 1;
      const updatedBlog = {
        id: blog.id,
        user: blog.user.id,
        likes: newLikes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };
      await blogService.update(updatedBlog);
      setBlogLikes(newLikes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable openLabel="view" closeLabel="hide" ref={blogRef}>
        <p>{blog.url}</p>
        <div>
          likes {blogLikes} <button onClick={handleUpdate}>like</button>
        </div>
        <p>{blog.author}</p>
      </Togglable>
    </div>
  );
};

export default Blog;
