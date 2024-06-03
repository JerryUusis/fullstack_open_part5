import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";

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
  }, [blogs]);

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
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
          severity={severity}
        />
      </>
    );
  }

  if (user) {
    return (
      <Blogs
        user={user}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        handleNewBlog={handleNewBlog}
        errorMessage={errorMessage}
        severity={severity}
        blogs={blogs}
        handleLogout={handleLogout}
      />
    );
  }
};

export default App;
