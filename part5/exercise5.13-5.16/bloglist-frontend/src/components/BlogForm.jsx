import { useState } from "react";
import PropTypes from "prop-types";

export const BlogForm = ({ addBlog }) => {
  BlogForm.prototype = {
    addBlog: PropTypes.func.isRequired,
  };
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleBlogChange = (e) => {
    const target = e.target;
    setNewBlog((preState) => ({ ...preState, [target.name]: target.value }));
  };

  const handleAddBlog = (event) => {
    event.preventDefault();
    addBlog(newBlog);
    setNewBlog({
      author: "",
      title: "",
      url: "",
    });
  };
  return (
    <form onSubmit={handleAddBlog}>
      <div>
        <label htmlFor="">title:</label>
        <input
          value={newBlog.title}
          name="title"
          data-testid="titleTest"
          id="title"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <label htmlFor="">author:</label>
        <input
          value={newBlog.author}
          name="author"
          data-testid="authorTest"
          id="author"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <label htmlFor="">url:</label>
        <input
          value={newBlog.url}
          name="url"
          data-testid="urlTest"
          id="url"
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit" id="button-create">
        create
      </button>
    </form>
  );
};
