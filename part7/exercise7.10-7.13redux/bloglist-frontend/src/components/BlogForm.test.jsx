import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogForm } from "./BlogForm";

describe("<BlogForm/> component to create a new blog", () => {
  test("clicking the button calls the event handler once to create a new blog", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();
    const blog = {
      title: "this is a new title to blog",
      author: "Jose Najera",
      url: "http://url.com",
    };
    const { container } = render(<BlogForm addBlog={createBlog} />);

    const inputTitle = container.querySelector("#title");
    const inputAuthor = container.querySelector("#author");
    const inputUrl = container.querySelector("#url");

    const buttonSave = container.querySelector("#button-create");
    await user.type(inputTitle, blog.title);
    await user.type(inputAuthor, blog.author);
    await user.type(inputUrl, blog.url);

    await user.click(buttonSave);

    // console.log(createBlog.mock.calls);
    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog.mock.calls[0][0]).toStrictEqual(blog);
  });
});
