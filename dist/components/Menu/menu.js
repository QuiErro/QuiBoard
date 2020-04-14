import React, { useState, createContext } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ index: "0" });
export var Menu = function (props) {
  var className = props.className,
    mode = props.mode,
    style = props.style,
    children = props.children,
    defaultIndex = props.defaultIndex,
    onSelect = props.onSelect,
    defaultOpenSubMenus = props.defaultOpenSubMenus;
  var _a = useState(defaultIndex),
    currentActive = _a[0],
    setActive = _a[1];
  var classes = classNames("quib-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  var handleClick = function (index) {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  var passedContext = {
    // currentActive 类型是：string | undefined ，index是 string类型
    // 如果是 index: currentActive 将报错 undefined类型不能赋值给string类型
    // 所以加一层判断：currentActive ? currentActive : '0'
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus: defaultOpenSubMenus,
  };
  var renderChildren = function () {
    /*
          Q: 为什么使用React.Children.map来遍历children，而不直接使用children.map？
          A: children的类型不确定，如果是函数，使用map方法会报错
        */
    return React.Children.map(children, function (child, index) {
      // child是 ReactNode类型，先断言成FunctionComponentElement类型，再拿到displayName内置属性
      var childElement = child;
      var displayName = childElement.type.displayName;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          // 添加index属性，利用遍历时可以拿到的index变量来设置，这样外界在使用时不必特地给MenuItem传入index属性
          index: index.toString(),
        });
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component");
      }
    });
  };
  return (
    // 通过data-testid属性 在测试时可以用getByTestId拿到ul元素
    React.createElement(
      "ul",
      { className: classes, style: style, "data-testid": "test-menu" },
      React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren()),
    )
  );
};
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};
export default Menu;
