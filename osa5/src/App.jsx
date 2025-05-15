import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState("");

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

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        title: title,
        author: author,
        url: blogUrl,
        user: user,
      };

      const returnedObject = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedObject));
      setTitle("");
      setAuthor("");
      setBlogUrl("");
      setTimedMessage(
        "success",
        `${blogObject.title} by ${blogObject.author} added`
      );
    } catch (exception) {
      console.log("Error occured when adding notes!");
      console.log(exception);
      setTimedMessage("error", exception.response.data.error);
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
      setTimedMessage("error", exception.response.data.error);
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
    <form onSubmit={addBlog}>
      <div>
        <div>
          title:
          <input
            type="text"
            value={title}
            name=""
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name=""
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogUrl}
            name=""
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
      </div>
      <button type="submit">create</button>
    </form>
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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
