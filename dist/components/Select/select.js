var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  };
import React, { useState, createContext, useRef, useEffect } from "react";
import classNames from "classnames";
import Input from "../Input";
import Tag from "../Tag";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition";
export var SelectContext = createContext({ selectedValues: [] });
export var Select = function (props) {
  var defaultValue = props.defaultValue,
    placeholder = props.placeholder,
    children = props.children,
    multiple = props.multiple,
    name = props.name,
    disabled = props.disabled,
    onChange = props.onChange,
    onVisibleChange = props.onVisibleChange;
  var input = useRef(null);
  var containerRef = useRef(null);
  var containerWidth = useRef(0);
  var _a = useState(Array.isArray(defaultValue) ? defaultValue : []),
    selectedValues = _a[0],
    setSelectedValues = _a[1];
  var _b = useState([]),
    options = _b[0],
    setOptions = _b[1];
  var _c = useState(false),
    menuOpen = _c[0],
    setOpen = _c[1];
  var _d = useState(typeof defaultValue === "string" ? defaultValue : ""),
    value = _d[0],
    setValue = _d[1];
  var handleOptionClick = function (value, isSelected) {
    var updatedValues = [value];
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
        ? selectedValues.filter(function (v) {
            return v !== value;
          })
        : __spreadArrays(selectedValues, [value]);
      setSelectedValues(updatedValues);
    }
    if (onChange) {
      onChange(value, updatedValues);
    }
  };
  var handleInputValueChange = function (e) {
    var value = e.target.value.trim();
    if (multiple) return;
    setValue(value);
  };
  useEffect(
    function () {
      var tempArr = [];
      React.Children.map(children, function (child) {
        var childElement = child;
        var _a = childElement.props.value,
          value = _a === void 0 ? "" : _a;
        if (value !== "disabled" && value) tempArr.push(value);
      });
      setOptions(tempArr);
    },
    [children],
  );
  useEffect(
    function () {
      // focus input
      if (input.current) {
        input.current.focus();
        if (multiple && selectedValues.length > 0) {
          input.current.placeholder = "";
        } else {
          if (placeholder) input.current.placeholder = placeholder;
        }
      }
    },
    [selectedValues, multiple, placeholder],
  );
  useEffect(function () {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width;
    }
  });
  useClickOutside(containerRef, function () {
    if (!multiple && options.indexOf(value) === -1) {
      setValue("");
    }
    setOpen(false);
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false);
    }
  });
  var passedContext = {
    onSelect: handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  };
  var handleClick = function (e) {
    e.preventDefault();
    if (!disabled) {
      setOpen(!menuOpen);
      if (onVisibleChange) {
        onVisibleChange(!menuOpen);
      }
    }
  };
  var generateOptions = function () {
    return React.Children.map(children, function (child, i) {
      var childElement = child;
      if (childElement.type.displayName === "Option") {
        return React.cloneElement(childElement, {
          index: "select-" + i,
        });
      } else {
        console.error("Warning: Select has a child which is not a Option component");
      }
    });
  };
  var containerClass = classNames("quib-select", {
    "menu-is-open": menuOpen,
    "is-disabled": disabled,
    "is-multiple": multiple,
  });
  return React.createElement(
    "div",
    { className: containerClass, ref: containerRef },
    React.createElement(
      "div",
      { className: "quib-select-input", onClick: handleClick },
      React.createElement(Input, {
        ref: input,
        placeholder: placeholder,
        value: value,
        readOnly: multiple,
        onChange: handleInputValueChange,
        icon: "angle-down",
        disabled: disabled,
        name: name,
      }),
    ),
    React.createElement(
      SelectContext.Provider,
      { value: passedContext },
      React.createElement(
        Transition,
        { in: menuOpen, animation: "zoom-in-top", timeout: 300 },
        React.createElement("ul", { className: "quib-select-dropdown" }, generateOptions()),
      ),
    ),
    multiple &&
      React.createElement(
        "div",
        { className: "quib-selected-tags", style: { maxWidth: containerWidth.current - 32 } },
        selectedValues.map(function (value, index) {
          return React.createElement(Tag, {
            key: "tag-" + index + "-" + Math.random(),
            text: value,
            onClose: function () {
              handleOptionClick(value, true);
            },
          });
        }),
      ),
  );
};
Select.defaultProps = {
  name: "quib-select",
  placeholder: "请选择",
};
export default Select;
