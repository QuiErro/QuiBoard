import React, { FC, useState, createContext, CSSProperties } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  /** active菜单项的索引值 */
  defaultIndex?: string;
  /** 自定义类名 */
  className?: string;
  /** Menu的类型 */
  mode?: MenuMode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击菜单项触发的回掉函数 */
  onSelect?: SelectCallback;
  /** 设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string; // 必选
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

export const Menu: FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("quib-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    // currentActive 类型是：string | undefined ，index是 string类型
    // 如果是 index: currentActive 将报错 undefined类型不能赋值给string类型
    // 所以加一层判断：currentActive ? currentActive : '0'
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };
  const renderChildren = () => {
    /*
      Q: 为什么使用React.Children.map来遍历children，而不直接使用children.map？
      A: children的类型不确定，如果是函数，使用map方法会报错
    */
    return React.Children.map(children, (child, index) => {
      // child是 ReactNode类型，先断言成FunctionComponentElement类型，再拿到displayName内置属性
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
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
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
