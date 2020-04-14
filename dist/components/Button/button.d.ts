import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
export declare type ButtonSize = "lg" | "sm";
export declare type ButtonType = "primary" | "default" | "danger" | "link";
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
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: FC<ButtonProps>;
export default Button;
