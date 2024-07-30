import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box>
      <Box style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Box>
      <Box
        style={showWhenVisible}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {props.children}
        <Box sx={props.style}>
          <Button onClick={toggleVisibility} color="inherit">
            cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

Togglable.displayName = "Togglable";
export default Togglable;
