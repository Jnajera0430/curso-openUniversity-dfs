export const BlogForm = ({ addBlog, newBlog, handleBlogChange }) => (
  <form onSubmit={addBlog}>
    <div>
      <label htmlFor="">title:</label>
      <input value={newBlog.title} name="title" onChange={handleBlogChange} />
    </div>
    <div>
      <label htmlFor="">author:</label>
      <input value={newBlog.author} name="author" onChange={handleBlogChange} />
    </div>
    <div>
      <label htmlFor="">url:</label>
      <input value={newBlog.url} name="url" onChange={handleBlogChange} />
    </div>
    <button type="submit">create</button>
  </form>
);
