import { useDispatch, useSelector } from "react-redux";
import { BlogForm } from "./BlogForm";
import Togglable from "./Toggable";
import { useRef } from "react";
import { createBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const BlogList = () => {
  const refBlog = useRef();
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const addBlog = (newBlog) => {
    refBlog.current.toggleVisibility();
    dispatch(createBlog(newBlog));
  };

  return (
    <Box>
      <Box>
        <h2>Blogs</h2>
      </Box>
      <Togglable buttonLabel="new blog" ref={refBlog}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {[...blogs]
              .sort((blogA, blogB) => blogB.likes - blogA.likes)
              .map((blog) => (
                <TableRow key={blog.id} /*className="cardBlog"*/>
                  <TableCell>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to={`/blogs/${blog.id}`}
                    >
                      {blog.title}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BlogList;
