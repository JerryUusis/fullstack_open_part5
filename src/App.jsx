import { useState, useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [severity, setSeverity] = useState();

  // Fetch blogs and save in the blogs state
  const fetchData = async () => {
    const request = await blogService.getAll();
    setBlogs(request);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Check if user state can be found from local storage
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }, [errorMessage]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      handleNotification("Login failed", "error");
      console.error(error);
    }
  };

  const handleNotification = (message, severity) => {
    setErrorMessage(message);
    setSeverity(severity);
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      await blogService.create(newBlog);
      handleNotification(`a new blog ${title} added succesfully`, "success");
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat(newBlog));
    } catch (error) {
      console.error(error);
      handleNotification("Adding new blog failed", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification errorMessage={errorMessage} severity={severity} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </>
    );
  }

  if (user) {
    return (
      <div>
        <div>
          <h2>blogs</h2>
          <Notification errorMessage={errorMessage} severity={severity} />
        </div>
        <div>
          {user.username} logged in
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
        <Togglable buttonLabel="new note">
          <BlogForm
            title={title}
            handleTitleChange={({ target }) => setTitle(target.value)}
            author={author}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            url={url}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleNewBlog={handleNewBlog}
          />
        </Togglable>
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  }
};

export default App;
