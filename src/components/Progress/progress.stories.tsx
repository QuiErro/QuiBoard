import React from "react";
import { storiesOf } from "@storybook/react";

import Progress from "./progress";

const defaultProgress = () => <Progress percent={60} />;

const progressWithType = () => (
  <>
    <Progress style={{ marginBottom: '10px' }} theme="secondary" percent={10} />
    <Progress style={{ marginBottom: '10px' }} theme="success" percent={20} />
    <Progress style={{ marginBottom: '10px' }} theme="info" percent={30} />
    <Progress style={{ marginBottom: '10px' }} theme="warning" percent={40} />
    <Progress style={{ marginBottom: '10px' }} showText={false} theme="danger" percent={50} />
    <Progress strokeHeight={20} theme="light" percent={60} />
  </>
);
storiesOf("Progress", module)
  .add("默认样式的 Progress", defaultProgress)
  .add("不同类型的 Progress", progressWithType);
