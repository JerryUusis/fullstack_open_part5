import Togglable from "./Togglable";
import { useRef } from "react";

const Blog = ({ blog }) => {
  const blogRef = useRef();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable openLabel="view" closeLabel="hide" ref={blogRef}>
        <p>{blog.url}</p>
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        <p>{blog.author}</p>
      </Togglable>
    </div>
  );
};

export default Blog;
