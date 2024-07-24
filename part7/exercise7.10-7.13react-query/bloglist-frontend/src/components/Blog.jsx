import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogServices from "../services/blogs";
import { useNotificationDispatch } from "../api/helpers/helpNotifications";

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();
  const blogPropTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  Blog.propTypes = {
    blog: PropTypes.shape(blogPropTypes).isRequired,
    // updateBlog: PropTypes.func.isRequired,
    // deleteBlog: PropTypes.func.isRequired,
  };
  const updateBlogMutation = useMutation({
    mutationFn: blogServices.update,
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries("blogs");
      dispatchNotification({
        type: "ADD",
        payload: {
          type: "success",
          message: `You liked the blog such as ${updatedBlog.title}`,
        },
      });
    },
    onError: () => {
      dispatchNotification({
        type: "ADD",
        payload: {
          type: "error",
          message: "An error occurred while trying to update the data.",
        },
      });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogServices.deleteOne,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      dispatchNotification({
        type: "ADD",
        payload: {
          type: "success",
          message: "Blog has been deleted",
        },
      });
    },
    onError: () => {
      dispatchNotification({
        type: "ADD",
        payload: {
          type: "error",
          message: "An error occurred while trying to delete data",
        },
      });
    },
  });

  const [isView, setIsView] = useState(false);
  const handleViewBlog = () => setIsView(!isView);
  const handleAddLike = () => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlogMutation.mutate(blogToUpdate);
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();
    const validDelete = confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (validDelete) {
      deleteBlogMutation.mutate(blog.id);
    }
  };
  const showWhenVisible = { display: isView ? "" : "none" };
  return (
    <div className="cardBlog">
      {blog.title} {blog.author}{" "}
      <button onClick={handleViewBlog} id="button-view-blog">
        {isView ? "hide" : "view"}
      </button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes}{" "}
          <button id="button-blog-likes" onClick={handleAddLike}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={handleDeleteBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
