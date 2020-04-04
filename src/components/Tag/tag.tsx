import React, { FC, useState } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";

export type ThemeProps = "primary" | "success" | "warning" | "danger";

export interface TagProps {
  /** Tag的主题色 */
  type?: ThemeProps;
  /** Tag的尺寸 */
  size?: "lg" | "sm";
  /** Tag的文本 */
  text: string;
  /** 关闭Tag */
  onClose?: () => void;
  /** 是否显示关闭图标 */
  closable?: boolean;
}

export const Tag: FC<TagProps> = (props) => {
  const [hide, setHide] = useState(false);
  const { className, type, size, text, onClose, closable, ...restProps } = props;
  const classes = classNames("quib-tag", className, {
    [`tag-${type}`]: type,
    [`tag-${size}`]: size,
  });
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setHide(true);
  };
  return (
    <Transition in={!hide} timeout={300} animation="zoom-in-left">
      <div className={classes} {...restProps}>
        <span>{text}</span>
        {closable && <Icon theme={type} icon="times" onClick={handleClose} />}
      </div>
    </Transition>
  );
};

Tag.defaultProps = {
  type: "primary",
  closable: true,
};

export default Tag;
