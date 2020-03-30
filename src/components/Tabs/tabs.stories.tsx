import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Tabs from "./index";
import Icon from "../Icon";

const defaultTabs = () => (
  <Tabs onSelect={action("selected")}>
    <Tabs.Item label="选项卡一">this is content one</Tabs.Item>
    <Tabs.Item label="选项卡二">this is content two</Tabs.Item>
  </Tabs>
);

const cardTabs = () => (
  <Tabs onSelect={action("selected")} type="card">
    <Tabs.Item label="card1">this is card one</Tabs.Item>
    <Tabs.Item label="card2">this is content two</Tabs.Item>
    <Tabs.Item label="disabled" disabled>
      this is content three
    </Tabs.Item>
  </Tabs>
);

const customTabs = () => (
  <Tabs onSelect={action("selected")} type="card">
    <Tabs.Item
      label={
        <>
          <Icon icon="check-circle" /> 自定义图标{" "}
        </>
      }
    >
      this is card one
    </Tabs.Item>
    <Tabs.Item label="tab2">this is content two</Tabs.Item>
  </Tabs>
);
storiesOf("Tabs", module)
  .add("默认样式的Tabs", defaultTabs)
  .add("选项卡样式的Tabs", cardTabs)
  .add("自定义选项卡样式", customTabs);
