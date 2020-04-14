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
import React, { forwardRef } from "react";
import classNames from "classnames";
import Icon from "../Icon";
/*
  Q: 为什么要用React.forwardRef包裹组件
  A: 函数组件 没有this 实例，不能使用ref属性
     所以使用React.forwardRef 它接收两个参数，第一个参数即传给组件的普通属性，第二个参数是ref
     此时自定义组件可以拿到ref，并传给input元素（真正想控制的元素）
*/
export var Input = forwardRef(function (props, ref) {
  var _a;
  var disabled = props.disabled,
    size = props.size,
    icon = props.icon,
    prepend = props.prepend,
    append = props.append,
    style = props.style,
    restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
  var classes = classNames(
    "quib-input-wrapper",
    ((_a = {}),
    (_a["input-size-" + size] = size),
    (_a["is-disabled"] = disabled),
    (_a["input-group"] = prepend || append),
    (_a["input-group-append"] = !!append),
    (_a["input-group-prepend"] = !!prepend),
    _a),
  );
  // 修正value的类型
  var fixControlledValue = function (value) {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return React.createElement(
    "div",
    { className: classes, style: style },
    prepend && React.createElement("div", { className: "quib-input-group-prepend" }, prepend),
    icon &&
      React.createElement(
        "div",
        { className: "icon-wrapper" },
        React.createElement(Icon, { icon: icon, title: "title-" + icon }),
      ),
    React.createElement(
      "input",
      __assign({ ref: ref, className: "quib-input-inner", disabled: disabled }, restProps),
    ),
    append && React.createElement("div", { className: "quib-input-group-append" }, append),
  );
});
export default Input;
