import { FC, CSSProperties } from "react";
export declare type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";
export interface ProgressProps {
  /** Progress的进度 */
  percent: number;
  /** Progress的高度 */
  strokeHeight?: number;
  /** 是否显示进度文本 */
  showText?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
  /** Progress的类型 */
  theme?: ThemeProps;
}
declare const Progress: FC<ProgressProps>;
export default Progress;
