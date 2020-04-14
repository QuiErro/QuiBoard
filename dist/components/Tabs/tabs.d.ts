import { FC } from "react";
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
export declare const Tabs: FC<TabsProps>;
export default Tabs;
