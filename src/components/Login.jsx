import Notification from "./Notification";

const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  errorMessage,
  severity
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      {errorMessage ? (
          <Notification errorMessage={errorMessage} severity={severity} />
        ) : null}
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
};

export default Login;
