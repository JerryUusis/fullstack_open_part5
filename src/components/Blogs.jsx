import Notification from "./Notification";
import Blog from "./Blog";

const Blogs = ({
  user,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleNewBlog,
  errorMessage,
  severity,
  blogs,
  handleLogout,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      {errorMessage ? (
        <Notification errorMessage={errorMessage} severity={severity} />
      ) : null}
      <div>
        {user.username} logged in
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button>create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
