import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
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
export declare const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;
export default Input;
