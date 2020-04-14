import React, { useState } from "react";
import classNames from "classnames";
export var Tabs = function (props) {
  var defaultIndex = props.defaultIndex,
    className = props.className,
    onSelect = props.onSelect,
    children = props.children,
    type = props.type;
  var _a = useState(defaultIndex),
    activeIndex = _a[0],
    setActiveIndex = _a[1];
  var handleClick = function (e, index, disabled) {
    if (!disabled) {
      setActiveIndex(index);
      if (onSelect) {
        onSelect(index);
      }
    }
  };
  var navClass = classNames("quib-tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });
  var renderNavLinks = function () {
    return React.Children.map(children, function (child, index) {
      var childElement = child;
      var _a = childElement.props,
        label = _a.label,
        disabled = _a.disabled;
      var classes = classNames("quib-tabs-nav-item", {
        "is-active": activeIndex === index,
        disabled: disabled,
      });
      return React.createElement(
        "li",
        {
          className: classes,
          key: "nav-item-" + index,
          onClick: function (e) {
            handleClick(e, index, disabled);
          },
        },
        label,
      );
    });
  };
  var renderContent = function () {
    return React.Children.map(children, function (child, index) {
      if (index === activeIndex) {
        return child;
      }
    });
  };
  return React.createElement(
    "div",
    { className: "quib-tabs " + className },
    React.createElement("ul", { className: navClass }, renderNavLinks()),
    React.createElement("div", { className: "quib-tabs-content" }, renderContent()),
  );
};
Tabs.defaultProps = {
  defaultIndex: 0,
  type: "line",
};
export default Tabs;
