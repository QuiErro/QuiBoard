import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "../src/styles/index.scss";
library.add(fas);

const wrapperStyle: React.CSSProperties = {
  padding: "20px 40px",
  width: "500px",
};
const titleStyle: React.CSSProperties = {
  marginBottom: "20px",
};

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3 style={titleStyle}>组件演示</h3>
    {stroyFn()}
  </div>
);
addDecorator(storyWrapper);
// 使用addon-info插件
addDecorator(withInfo);
// 配置addon-info
addParameters({ info: { inline: true, header: false } });
// const loaderFn = () => {
//   const allExports = [require('../src/welcome.stories.tsx')];
//   const req = require.context('../src/components', true, /\.stories\.tsx$/);
//   req.keys().forEach(fname => allExports.push(req(fname)));
//   return allExports;
// };

const loaderFn = () => {
  return [
    require("../src/components/Button/button.stories.tsx"),
    require("../src/components/Alert/alert.stories.tsx"),
    require("../src/components/Icon/icon.stories.tsx"),
    require("../src/components/Menu/menu.stories.tsx"),
    require("../src/components/Tabs/tabs.stories.tsx"),
    require("../src/components/Progress/progress.stories.tsx"),
  ];
};

// automatically import all files ending in *.stories.js
configure(loaderFn, module);
