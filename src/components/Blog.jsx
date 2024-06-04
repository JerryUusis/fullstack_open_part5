import { useState } from "react";
import Togglable from "./Togglable";
import { useRef } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, handleDelete, currentUser }) => {
  const [blogLikes, setBlogLikes] = useState(blog.likes);
  const blogRef = useRef();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    currentUser: PropTypes.string.isRequired
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

  const openConfirm = () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      handleDelete(blog.id);
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
        {currentUser === blog.user.username ? (
          <button style={{ display: "block" }} onClick={openConfirm}>
            remove
          </button>
        ) : null}
      </Togglable>
    </div>
  );
};

export default Blog;
