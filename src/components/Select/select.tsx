import React, {
  FC,
  useState,
  ChangeEvent,
  createContext,
  useRef,
  FunctionComponentElement,
  useEffect,
} from "react";
import classNames from "classnames";
import Input from "../Input";
import Tag from "../Tag";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition";
import { SelectOptionProps } from "./option";

export interface SelectProps {
  /** 默认选中的选项	 可以是字符串或者字符串数组*/
  defaultValue?: string | string[];
  placeholder?: string;
  /** 是否禁用*/
  disabled?: boolean;
  /** 是否支持多选*/
  multiple?: boolean;
  /** input 的 name 属性	 */
  name?: string;
  /** 选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void;
}

export interface ISelectContext {
  onSelect?: (value: string, isSelected?: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}

export const SelectContext = createContext<ISelectContext>({ selectedValues: [] });

export const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder,
    children,
    multiple,
    name,
    disabled,
    onChange,
    onVisibleChange,
  } = props;
  const input = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLInputElement>(null);
  const containerWidth = useRef(0);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : [],
  );
  const [options, setOptions] = useState<string[]>([]);
  const [menuOpen, setOpen] = useState(false);
  const [value, setValue] = useState(typeof defaultValue === "string" ? defaultValue : "");
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    let updatedValues = [value];
    if (!multiple) {
      setOpen(false);
      setValue(value);
      if (onVisibleChange) {
        onVisibleChange(false);
      }
    } else {
      // 多选模式
      setValue("");
      // 如果当前点击的选项已被选中，则去除选中状态；如果之前未被选中，则设为选中状态
      updatedValues = isSelected
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(updatedValues);
    }
    if (onChange) {
      onChange(value, updatedValues);
    }
  };
  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (multiple) return;
    setValue(value);
  };
  useEffect(() => {
    const tempArr: String[] = [];
    children.forEach((item) => {
      const {
        props: { value },
      } = item;
      if (value !== "disabled") tempArr.push(value);
    });
    setOptions(tempArr);
  }, [children]);
  useEffect(() => {
    // focus input
    if (input.current) {
      input.current.focus();
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = "";
      } else {
        if (placeholder) input.current.placeholder = placeholder;
      }
    }
  }, [selectedValues, multiple, placeholder]);
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width;
    }
  });
  useClickOutside(containerRef, () => {
    if (!multiple && options.indexOf(value) === -1) {
      setValue("");
    }
    setOpen(false);
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false);
    }
  });
  const passedContext: ISelectContext = {
    onSelect: handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setOpen(!menuOpen);
      if (onVisibleChange) {
        onVisibleChange(!menuOpen);
      }
    }
  };
  const generateOptions = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<SelectOptionProps>;
      if (childElement.type.displayName === "Option") {
        return React.cloneElement(childElement, {
          index: `select-${i}`,
        });
      } else {
        console.error("Warning: Select has a child which is not a Option component");
      }
    });
  };
  const containerClass = classNames("quib-select", {
    "menu-is-open": menuOpen,
    "is-disabled": disabled,
    "is-multiple": multiple,
  });
  return (
    <div className={containerClass} ref={containerRef}>
      <div className="quib-select-input" onClick={handleClick}>
        <Input
          ref={input}
          placeholder={placeholder}
          value={value}
          readOnly={multiple}
          onChange={handleInputValueChange}
          icon="angle-down"
          disabled={disabled}
          name={name}
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="quib-select-dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>
      {multiple && (
        <div className="quib-selected-tags" style={{ maxWidth: containerWidth.current - 32 }}>
          {selectedValues.map((value, index) => {
            return (
              <Tag
                key={`tag-${index}-${Math.random()}`}
                text={value}
                onClose={() => {
                  handleOptionClick(value, true);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
Select.defaultProps = {
  name: "quib-select",
  placeholder: "请选择",
};
export default Select;
