import React, { FC, useState, FunctionComponentElement, MouseEvent } from "react";
import classNames from "classnames";
import { TabItemProps } from "./tabItem";

export interface TabsProps {
  /** active item的下标 */
  defaultIndex?: number;
  /** 自定义类名 */
  className?: string;
  /** Tab点击事件触发后的回调函数 */
  onSelect?: (selectedIndex: number) => void;
  /** Tabs的类型 */
  type?: "line" | "card";
}

export const Tabs: FC<TabsProps> = (props) => {
  const { defaultIndex, className, onSelect, children, type } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const handleClick = (e: MouseEvent, index: number, disabled: boolean | undefined) => {
    if (!disabled) {
      setActiveIndex(index);
      if (onSelect) {
        onSelect(index);
      }
    }
  };
  const navClass = classNames("quib-tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames("quib-tabs-nav-item", {
        "is-active": activeIndex === index,
        disabled: disabled,
      });
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => {
            handleClick(e, index, disabled);
          }}
        >
          {label}
        </li>
      );
    });
  };
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child;
      }
    });
  };
  return (
    <div className={`quib-tabs ${className}`}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="quib-tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: "line",
};
export default Tabs;
