import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [type, setType] = useState(null);
  const [message, setMessage] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedObject = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedObject));
      setTimedMessage(
        "success",
        `${blogObject.title} by ${blogObject.author} added`
      );
    } catch (exception) {
      console.log("[DEBUG] Error occured when adding notes!");
      console.log(exception);
      setTimedMessage("error: " + exception.response.data.error);
    }
  };

  const likeBlog = async (blogObject) => {
    try {
      const returnedObject = await blogService.update(
        blogObject.id,
        blogObject
      );
      setBlogs(
        blogs.map((blog) =>
          blog.id !== returnedObject.id ? blog : returnedObject
        )
      );
      setTimedMessage("success", `${returnedObject.title} updated`);
    } catch (exception) {
      console.log("[DEBUG] Error occured when updating notes!");
      console.log(exception);
      setTimedMessage("error: " + exception.response.data.error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setTimedMessage("success", `${user.username} logged in succesfully!`);
    } catch (exception) {
      console.log("[DEBUG] Error occured when logging in!");
      console.log(exception);
      setTimedMessage("error: " + exception.response.data.error);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name=""
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name=""
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const logOutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  );

  const noteForm = () => (
    <Togglable buttonLabel={"New Blog"} ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user} />
    </Togglable>
  );

  const setTimedMessage = (type, message) => {
    setType(type);
    setMessage(message);
    setTimeout(() => {
      setType(null);
      setMessage("");
    }, 3000);
  };

  return (
    <div>
      {!user && (
        <>
          <h2>log in to application</h2>
          <Message type={type} message={message} />
          {loginForm()}
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Message type={type} message={message} />
          <p>{user.name} logged in </p>
          {logOutForm()}
          <h2>create new</h2>
          {noteForm()}
          <br />
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} likeBlog={likeBlog} user={user} />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
