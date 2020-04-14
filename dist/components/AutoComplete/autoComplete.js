var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import Icon from "../Icon";
import Transition from "../Transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
export var AutoComplete = function (props) {
  var onFilter = props.onFilter,
    onSelect = props.onSelect,
    value = props.value,
    renderOption = props.renderOption,
    restProps = __rest(props, ["onFilter", "onSelect", "value", "renderOption"]);
  var _a = useState(value),
    inputValue = _a[0],
    setInputValue = _a[1];
  var _b = useState([]),
    options = _b[0],
    setOptions = _b[1];
  var _c = useState(false),
    loading = _c[0],
    setLoading = _c[1];
  var _d = useState(false),
    showDropdown = _d[0],
    setShowDropdown = _d[1];
  var _e = useState(-1),
    highlightIndex = _e[0],
    setHighlightIndex = _e[1];
  var triggerSearch = useRef(false);
  var componentRef = useRef(null);
  var debouncedValue = useDebounce(inputValue, 300); // 函数防抖
  // 当点击到AutoComplete组件外的区域，会自动关闭下拉框选项部分
  useClickOutside(componentRef, function () {
    setOptions([]);
  });
  useEffect(
    function () {
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
        var results = onFilter(debouncedValue);
        if (results instanceof Promise) {
          setLoading(true);
          results.then(function (data) {
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
    },
    [debouncedValue, onFilter],
  );
  var highlight = function (index) {
    if (index < 0) index = 0;
    if (index >= options.length) {
      index = options.length - 1;
    }
    setHighlightIndex(index);
  };
  var handleKeyDown = function (e) {
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
  var handleChange = function (e) {
    var value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  var handleSelect = function (item) {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  var renderTemplate = function (item) {
    return renderOption ? renderOption(item) : item.value;
  };
  var generateDropdown = function () {
    return React.createElement(
      Transition,
      {
        in: showDropdown || loading,
        animation: "zoom-in-top",
        timeout: 300,
        onExited: function () {
          setOptions([]);
        },
      },
      React.createElement(
        "ul",
        { className: "quib-suggestion-list" },
        loading &&
          React.createElement(
            "div",
            { className: "suggstions-loading-icon" },
            React.createElement(Icon, { icon: "spinner", spin: true }),
          ),
        options.map(function (item, index) {
          var classes = classNames("suggestion-item", {
            "is-active": index === highlightIndex,
          });
          return React.createElement(
            "li",
            {
              key: index,
              className: classes,
              onClick: function () {
                return handleSelect(item);
              },
            },
            renderTemplate(item),
          );
        }),
      ),
    );
  };
  return React.createElement(
    "div",
    { className: "quib-auto-complete", ref: componentRef },
    React.createElement(
      Input,
      __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps),
    ),
    generateDropdown(),
  );
};
export default AutoComplete;
