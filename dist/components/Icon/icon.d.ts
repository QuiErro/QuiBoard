import { FC } from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export declare type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";
export interface IconProps extends FontAwesomeIconProps {
  /** Icon的主题色 */
  theme?: ThemeProps;
}
export declare const Icon: FC<IconProps>;
export default Icon;
