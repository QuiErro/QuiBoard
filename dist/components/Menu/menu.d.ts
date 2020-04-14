import React, { FC, CSSProperties } from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  /** active菜单项的索引值 */
  defaultIndex?: string;
  /** 自定义类名 */
  className?: string;
  /** Menu的类型 */
  mode?: MenuMode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击菜单项触发的回掉函数 */
  onSelect?: SelectCallback;
  /** 设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
export declare const Menu: FC<MenuProps>;
export default Menu;
