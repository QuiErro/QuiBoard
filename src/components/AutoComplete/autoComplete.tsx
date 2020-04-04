import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon";
import Transition from "../Transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /** 自定义下拉选项筛选函数 */
  onFilter: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选中下拉选项时触发的回调 */
  onSelect?: (item: DataSourceType) => void;
  /** 自定义渲染下拉选项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { onFilter, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [options, setOptions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 300); // 函数防抖
  // 当点击到AutoComplete组件外的区域，会自动关闭下拉框选项部分
  useClickOutside(componentRef, () => {
    setOptions([]);
  });
  useEffect(() => {
    /*
    Q: 为什么需要triggerSearch？
    A: 不用triggerSearch的话，这里options选项组的改变只依赖于debouncedValue,
    debouncedValue是通过inputValue经防抖函数计算得到的，delay时长500ms
    这里会有个问题：如果用户选择了某一下拉选项，这时选项值会回填到input中，debounceValue会改变，options也会改变，下拉框将一直存在
    我们所希望的是，当用户选择某一项后，下拉框隐藏，options也不必再重新计算。triggerSearch.current就可以当做是用于判断的变量
    在input的onChange事件触发时，triggerSearch.current设为true，在下拉框的li的handleSelect事件触发时，设为false
    */
    if (debouncedValue && triggerSearch.current) {
      setOptions([]);
      const results = onFilter(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setOptions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setOptions(results);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, onFilter]);
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= options.length) {
      index = options.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (options[highlightIndex]) {
          handleSelect(options[highlightIndex]);
        }
        break;
      // 上
      case 38:
        highlight(highlightIndex - 1);
        break;
      // 下
      case 40:
        highlight(highlightIndex + 1);
        break;
      // ESC
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setOptions([]);
        }}
      >
        <ul className="quib-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {options.map((item, index) => {
            const classes = classNames("suggestion-item", {
              "is-active": index === highlightIndex, // 结合highlightIndex，做高亮处理
            });
            return (
              <li key={index} className={classes} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className="quib-auto-complete" ref={componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
