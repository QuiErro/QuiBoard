import { FC } from "react";
export interface SubMenuProps {
  index?: string;
  /**下拉菜单选项的文字 */
  title: string;
  className?: string;
}
export declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
