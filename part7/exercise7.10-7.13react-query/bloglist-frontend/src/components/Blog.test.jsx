import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog/> component to render a blog", () => {
  test("renders content", () => {
    const blog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: {
        id: "thisisID",
        name: "user",
        username: "username",
      },
    };

    const updateBlogMock = vi.fn();
    const deleteBlogMock = vi.fn();

    render(
      <Blog
        blog={blog}
        deleteBlog={deleteBlogMock}
        updateBlog={updateBlogMock}
      />
    );

    const element = screen.getByText("React patterns", { exact: false });

    //screen.debug(element);

    expect(element).toBeDefined();
  });

  test("clicking the button calls the event handler once to display more blog data", async () => {
    const blog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: {
        id: "thisisID",
        name: "user",
        username: "username",
      },
    };

    const updateBlogMock = vi.fn();
    const deleteBlogMock = vi.fn();

    const user = userEvent.setup();

    const { container } = render(
      <Blog
        blog={blog}
        deleteBlog={deleteBlogMock}
        updateBlog={updateBlogMock}
      />
    );

    const buttonToShowData = container.querySelector("#button-view-blog");

    await user.click(buttonToShowData);

    const blogUrlElement = screen.getByText(blog.url);
    const likesElement = screen.getByText(`Likes ${blog.likes}`);

    expect(blogUrlElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
  });

  test("clicking the button calls the event handler once to button likes", async () => {
    const blog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: {
        id: "thisisID",
        name: "user",
        username: "username",
      },
    };

    const updateBlogMock = vi.fn();
    const deleteBlogMock = vi.fn();

    const user = userEvent.setup();

    const { container } = render(
      <Blog
        blog={blog}
        deleteBlog={deleteBlogMock}
        updateBlog={updateBlogMock}
      />
    );

    const buttonToShowData = container.querySelector("#button-view-blog");
    await user.click(buttonToShowData);

    const buttonToLike = container.querySelector("#button-blog-likes");

    await user.dblClick(buttonToLike);
    expect(updateBlogMock).toHaveBeenCalledTimes(2);
  });
});
