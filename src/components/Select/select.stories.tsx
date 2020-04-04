import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Select from "./index";

const defaultSelect = () => (
  <Select placeholder="请选择" onChange={action("changed")} onVisibleChange={action("visible")}>
    <Select.Option value="hello" />
    <Select.Option value="hello2" />
    <Select.Option value="hello3" />
    <Select.Option value="disabled" disabled />
    <Select.Option value="hello5" />
  </Select>
);
const multipleSelect = () => (
  <Select
    placeholder="多选"
    onChange={action("changed")}
    onVisibleChange={action("visible")}
    multiple
  >
    <Select.Option value="hello" />
    <Select.Option value="hello2" />
    <Select.Option value="hello3" />
    <Select.Option value="hello4" />
    <Select.Option value="hello5" />
  </Select>
);

const disabledSelect = () => (
  <Select placeholder="禁用" disabled>
    <Select.Option value="hello" />
    <Select.Option value="hello2" />
    <Select.Option value="hello3" />
  </Select>
);

storiesOf("Select", module)
  .add("默认的 Select", defaultSelect)
  .add("支持多选的 Select", multipleSelect)
  .add("被禁用的 Select", disabledSelect);
