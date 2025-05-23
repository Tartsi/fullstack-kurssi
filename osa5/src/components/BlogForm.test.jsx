import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> creates blogs with correct information", async () => {
  const testUser = {
    username: "testuser",
    id: "12345",
  };

  const user = userEvent.setup();
  const createBlog = vi.fn();

  const { container } = render(
    <BlogForm createBlog={createBlog} user={testUser} />
  );

  const titleInput = container.querySelector("#title-input");
  const authorInput = container.querySelector("#author-input");
  const urlInput = container.querySelector("#url-input");
  const createButton = screen.getByText("create");

  await user.type(titleInput, "Blog Title");
  await user.type(authorInput, "Blog Author");
  await user.type(urlInput, "URL");
  await user.click(createButton);

  expect(createBlog.mock.calls[0][0].title).toBe("Blog Title");
  expect(createBlog.mock.calls[0][0].author).toBe("Blog Author");
  expect(createBlog.mock.calls[0][0].url).toBe("URL");
  expect(createBlog.mock.calls[0][0].user).toBe(testUser);
});
