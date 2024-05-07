import { useState } from "react";

export const BlogForm = ({ addBlog }) => {
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
        <input value={newBlog.title} name="title" onChange={handleBlogChange} />
      </div>
      <div>
        <label htmlFor="">author:</label>
        <input
          value={newBlog.author}
          name="author"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <label htmlFor="">url:</label>
        <input value={newBlog.url} name="url" onChange={handleBlogChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
