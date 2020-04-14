import { FC, ReactElement } from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
  value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /** 自定义下拉选项筛选函数 */
  onFilter: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选中下拉选项时触发的回调 */
  onSelect?: (item: DataSourceType) => void;
  /** 自定义渲染下拉选项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
