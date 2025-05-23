import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: blogUrl,
      user: user,
    });
    setTitle("");
    setAuthor("");
    setBlogUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
            id="url-input"
          />
        </div>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
