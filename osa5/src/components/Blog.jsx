import { useState } from "react";

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateBlog = (event) => {
    event.preventDefault();
    likeBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: user.id,
    });
  };

  const removeBlog = (event) => {
    event.preventDefault();
    deleteBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
    });
  };

  const logging = (event) => {
    event.preventDefault();
    console.log("blog.user:", blog.user);
    console.log("logged in user:", user);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={updateBlog}>like</button>
          </div>
          <div>{blog.author}</div>
          <div>Added to site by: {blog.user.username} </div>
          {blog.user && user && blog.user.username === user.username && (
            <button onClick={removeBlog}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
