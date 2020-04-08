import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

/*
export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}
export enum ButtonType {
  Primary = "primary",
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}
*/

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  /** Button的自定义类名 */
  className?: string;
  /** Button是否可用 */
  disabled?: boolean;
  /** Button的尺寸 */
  btnSize?: ButtonSize;
  /** Button的类型 */
  btnType?: ButtonType;
  /** Button的跳转链接 */
  href?: string;
  // children: ReactNode;
  // 不必再加children属性，组件使用了FC类型，props会获得children属性
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>; // 集成基础属性和原生button属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>; // 集成基础属性和原生a标签属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; // Partial<> => 所有属性皆为可选
export const Button: FC<ButtonProps> = (props) => {
  const { className, disabled, btnSize, btnType, href, children, ...restProps } = props;

  const classes = classNames(className, "btn", {
    [`btn-${btnType}`]: btnType,
    [`btn-${btnSize}`]: btnSize,
    // 'disabled': (btnType === ButtonType.Link) && disabled    button是利用disabled属性, a标签是将disabled添加到类名来控制样式
    disabled: btnType === "link" && disabled,
  });

  // if(btnType === ButtonType.Link && href){
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  // btnType: ButtonType.Default
  btnType: "default",
};

export default Button;
