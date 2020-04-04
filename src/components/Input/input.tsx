import React, { ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef } from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

// Omit 忽略size属性
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /** Input是否禁用 */
  disabled?: boolean;
  /** Input的尺寸 */
  size?: "lg" | "sm";
  /** 添加图标 */
  icon?: IconProp;
  /** 添加前缀 */
  prepend?: string | ReactElement;
  /** 添加后缀 */
  append?: string | ReactElement;
  /** Input内容改变时的回调函数 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/*
  Q: 为什么要用React.forwardRef包裹组件
  A: 函数组件 没有this 实例，不能使用ref属性 
     所以使用React.forwardRef 它接收两个参数，第一个参数即传给组件的普通属性，第二个参数是ref
     此时自定义组件可以拿到ref，并传给input元素（真正想控制的元素）
*/

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, allowClear, icon, prepend, append, style, ...restProps } = props;
  const classes = classNames("quib-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });
  // 修正value的类型
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="quib-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input ref={ref} className="quib-input-inner" disabled={disabled} {...restProps} />
      {append && <div className="quib-input-group-append">{append}</div>}
    </div>
  );
});

export default Input;
