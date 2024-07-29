import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    editBlog(state, action) {
      const blogToEdit = action.payload;
      const blogToChange = state.find((blog) => blog.id === blogToEdit.id);

      const changedBlog = {
        ...blogToChange,
        ...blogToEdit,
      };

      return state.map((blog) =>
        blog.id === blogToEdit.id ? changedBlog : blog
      );
    },
    deleteBlog(state, action) {
      const id = action.payload;

      return state.filter((blog) => blog.id !== id);
    },
    addComment(state, action) {
      const idBlog = action.payload.idBlog;
      const comment = action.payload.comment;
      const blogToEdit = state.find((blog) => blog.id === idBlog);
      const changedBlog = {
        ...blogToEdit,
      };
      changedBlog.comments = changedBlog.comments.concat(comment);

      return state.map((blog) =>
        blog.id === blogToEdit.id ? changedBlog : blog
      );
    }
  },
});

export const { appendBlog, setBlogs, editBlog, deleteBlog, addComment } = blogSlice.actions;

export const initialzeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const blogCreated = await blogServices.create(content);
      dispatch(appendBlog(blogCreated));
      dispatch(
        setNotification({
          message: `a new blog ${blogCreated.title} by ${blogCreated.author} added`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: "error when creating a new blog",
          type: "error",
        })
      );
    }
  };
};

export const updateBlog = (content, id) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogServices.update(content, id);
      dispatch(editBlog(updatedBlog));
      dispatch(
        setNotification({
          message: `You liked the blog such as ${updatedBlog.title}`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: "An error occurred while trying to update the data.",
          type: "errpr",
        })
      );
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogServices.deleteOne(id);
      dispatch(deleteBlog(id));
      dispatch(
        setNotification({
          message: "Blog has been deleted",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: "An error occurred while trying to delete data",
          type: "error",
        })
      );
    }
  };
};

export const addCommentForBlog = (idBlog, comment) => {
  return async (dispatch) => {
    try {
      const commentCreated = await blogServices.addComment(idBlog, comment);
      dispatch(addComment({
        idBlog,
        comment: commentCreated
      }));
      dispatch(
        setNotification({
          message: "Added comment",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: "An error occurred while adding the comment",
          type: "error",
        })
      );
    }
  }
}

export default blogSlice.reducer;
