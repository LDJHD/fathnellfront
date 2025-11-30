import PropTypes from "prop-types";
import React, { useReducer } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./style.css";

export const Link = ({ TYPE, stateProp, className = "", text = "Link", to = "#" }) => {
  const [state, dispatch] = useReducer(reducer, {
    TYPE: TYPE || "header",
    state: stateProp || "inactive",
  });

  const content = (
    <div
      className={`link ${state.state} ${state.TYPE} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {["URL", "active", "drop-inactive", "hover", "inactive"].includes(state.state) && (
        <div className="text">{text}</div>
      )}

      {state.state === "drop-active" && (
        <>
          <div className="text-wrapper">{text}</div>

          <div
            className="link-drop-menu"
            onMouseLeave={() => {
              dispatch("mouse_leave_23");
            }}
          >
            <div className="div-wrapper">
              <div className="div">tip 1</div>
            </div>

            <div className="text-wrapper-2">
              <div className="div">tip 2</div>
            </div>

            <div className="text-wrapper-2">
              <div className="div">tip 3</div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return <RouterLink to={to}>{content}</RouterLink>;
};

function reducer(state, action) {
  if (state.TYPE === "header" && state.state === "inactive") {
    switch (action) {
      case "mouse_enter":
        return {
          TYPE: "header",
          state: "hover",
        };
    }
  }

  if (state.TYPE === "header" && state.state === "hover") {
    switch (action) {
      case "mouse_leave":
        return {
          TYPE: "header",
          state: "URL",
        };
    }
  }

  if (state.TYPE === "footer" && state.state === "inactive") {
    switch (action) {
      case "mouse_enter":
        return {
          TYPE: "footer",
          state: "hover",
        };
    }
  }

  if (state.TYPE === "footer" && state.state === "hover") {
    switch (action) {
      case "mouse_leave":
        return {
          TYPE: "footer",
          state: "inactive",
        };
    }
  }

  if (state.TYPE === "header" && state.state === "drop-inactive") {
    switch (action) {
      case "mouse_enter":
        return {
          TYPE: "header",
          state: "drop-active",
        };
    }
  }

  if (state.TYPE === "header" && state.state === "drop-active") {
    switch (action) {
      case "mouse_leave_23":
        return {
          TYPE: "header",
          state: "drop-inactive",
        };
    }
  }

  if (state.TYPE === "header" && state.state === "URL") {
    switch (action) {
      case "mouse_enter":
        return {
          TYPE: "header",
          state: "hover",
        };
    }
  }

  return state;
}

Link.propTypes = {
  TYPE: PropTypes.oneOf(["header", "footer"]),
  stateProp: PropTypes.oneOf(["inactive", "drop-active", "active", "URL", "drop-inactive", "hover"]),
  text: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
};

export default Link;

