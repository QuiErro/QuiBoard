import { FC } from "react";
export declare type AlertType = "success" | "default" | "danger" | "warning";
export interface AlertProps {
  /** Alert的标题 必选属性 */
  title: string;
  /** Alert的描述 */
  description?: string;
  /** Alert的类型 */
  type?: AlertType;
  /** 关闭Alert */
  onClose?: () => void;
  /** 是否显示关闭图标 */
  closable?: boolean;
}
export declare const Alert: FC<AlertProps>;
export default Alert;
