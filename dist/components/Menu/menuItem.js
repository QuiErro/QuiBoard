import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
export var MenuItem = function (_a) {
  var index = _a.index,
    disabled = _a.disabled,
    className = _a.className,
    style = _a.style,
    children = _a.children;
  var context = useContext(MenuContext);
  var classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  var handleClick = function () {
    // 多加一层判断，因为index是 string | undefined 联合类型
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };
  return React.createElement(
    "li",
    { className: classes, style: style, onClick: handleClick },
    children,
  );
};
// 利用内置属性 displayName 加以区分组件类型(在遍历Menu的children时用到)
MenuItem.displayName = "MenuItem";
export default MenuItem;
