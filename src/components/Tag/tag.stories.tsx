import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Tag from "./tag";

const defaultTags = () => (
  <>
    <Tag text="T1" onClose={action("closed")} />
    <Tag text="T2" closable={false} />
    <Tag text="T3" onClose={action("closed")} />
  </>
);

const themeTags = () => (
  <>
    <Tag text="T4" type="success" onClose={action("closed")} />
    <Tag text="T5" type="warning" onClose={action("closed")} />
    <Tag text="T6" type="danger" onClose={action("closed")} />
  </>
);

const sizeTags = () => (
  <>
    <Tag text="T9" size="sm" />
    <Tag text="T7" />
    <Tag text="T8" size="lg" />
  </>
);

storiesOf("Tag", module)
  .add("默认样式的 Tag", defaultTags)
  .add("不同主题的 Tag", themeTags)
  .add("不同尺寸的 Tag", sizeTags);
