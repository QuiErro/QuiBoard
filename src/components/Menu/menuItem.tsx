import React, { FC, useContext, CSSProperties } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string; // 外界使用MenuItem时不必传入index，因为在父组件Menu中，将会对children进行遍历，index属性会自动赋值传给子组件
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = ({ index, disabled, className, style, children }) => {
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    // 多加一层判断，因为index是 string | undefined 联合类型
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

// 利用内置属性 displayName 加以区分组件类型(在遍历Menu的children时用到)
MenuItem.displayName = "MenuItem";
export default MenuItem;
