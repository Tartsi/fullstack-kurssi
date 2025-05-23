import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  expect(screen.getByText(/Test Blog/)).toBeInTheDocument();
  expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  expect(screen.queryByText(/testblog.com/)).not.toBeInTheDocument();
});

test("blog displays url, likes and user after 'view'-button pressed", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "testblog.com",
    likes: 15,
    user: { username: "testuser" },
  };

  render(<Blog blog={blog} likeBlog={() => {}} deleteBlog={() => {}} />);

  const userPress = userEvent.setup();
  const button = screen.getByText("view");
  await userPress.click(button);

  console.log("Debug here:");
  screen.debug();

  expect(screen.getByText(/testblog.com/)).toBeInTheDocument();
  expect(screen.getByText(/likes 15/)).toBeInTheDocument();
  expect(screen.getByText(/testuser/)).toBeInTheDocument();
});
