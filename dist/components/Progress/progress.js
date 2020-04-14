import React from "react";
var Progress = function (props) {
  var percent = props.percent,
    strokeHeight = props.strokeHeight,
    showText = props.showText,
    style = props.style,
    theme = props.theme;
  return React.createElement(
    "div",
    { className: "quib-progress-bar", style: style },
    React.createElement(
      "div",
      { className: "quib-progress-bar-outer", style: { height: strokeHeight + "px" } },
      React.createElement(
        "div",
        { className: "quib-progress-bar-inner color-" + theme, style: { width: percent + "%" } },
        showText && React.createElement("span", { className: "inner-text" }, percent + "%"),
      ),
    ),
  );
};
Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
export default Progress;
