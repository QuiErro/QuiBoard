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
import React, { useState } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";
export var Tag = function (props) {
  var _a;
  var _b = useState(false),
    hide = _b[0],
    setHide = _b[1];
  var className = props.className,
    type = props.type,
    size = props.size,
    text = props.text,
    onClose = props.onClose,
    closable = props.closable,
    restProps = __rest(props, ["className", "type", "size", "text", "onClose", "closable"]);
  var classes = classNames(
    "quib-tag",
    className,
    ((_a = {}), (_a["tag-" + type] = type), (_a["tag-" + size] = size), _a),
  );
  var handleClose = function (e) {
    if (onClose) {
      onClose();
    }
    setHide(true);
  };
  return React.createElement(
    Transition,
    { in: !hide, timeout: 300, animation: "zoom-in-left" },
    React.createElement(
      "div",
      __assign({ className: classes }, restProps),
      React.createElement("span", null, text),
      closable && React.createElement(Icon, { theme: type, icon: "times", onClick: handleClose }),
    ),
  );
};
Tag.defaultProps = {
  type: "primary",
  closable: true,
};
export default Tag;
