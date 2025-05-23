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

  expect(screen.getByText(/testblog.com/)).toBeInTheDocument();
  expect(screen.getByText(/likes 15/)).toBeInTheDocument();
  expect(screen.getByText(/testuser/)).toBeInTheDocument();
});

test("if like button is pressed twice, function is called twice", async () => {
  const testUser = {
    username: "testuser",
    id: "12345",
  };

  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "testblog.com",
    likes: 15,
    user: { username: "testuser" },
  };

  const mockHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      likeBlog={mockHandler}
      deleteBlog={() => {}}
      user={testUser}
    />
  );

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  console.log("Debug here");
  screen.debug();

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
