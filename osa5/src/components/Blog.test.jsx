import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("blog displays only title and author initially", () => {
  const testUser = {
    username: "testuser",
  };

  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "testblog.com",
    likes: 0,
  };

  render(
    <Blog
      blog={blog}
      likeBlog={() => {}}
      deleteBlog={() => {}}
      user={testUser}
    />
  );

  console.log("Debug here:");
  screen.debug();

  expect(screen.getByText(/Test Blog/)).toBeInTheDocument();
  expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  expect(screen.queryByText(/testblog.com/)).not.toBeInTheDocument();
});
