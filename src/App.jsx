import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const request = await blogService.getAll();
      setBlogs(request);
    };
    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.username} logged in
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
