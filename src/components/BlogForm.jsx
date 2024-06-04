const BlogForm = ({
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
  handleNewBlog
}) => {
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
