import Alert from "./components/Alert/alert";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/tabs";
import TabItem from "./components/Tabs/tabItem";
import Icon from "./components/Icon/icon";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const App: React.FC = () => {
  return (
    <>
      <Button btnSize="sm" btnType="link">
        Button!!!
      </Button>
      <Button>Button!!!</Button>
      <Button btnType="danger">Button!!!</Button>
      <Button btnSize="lg" btnType="primary">
        Button!!!
      </Button>
      <Alert
        title="Error Text"
        type="danger"
        description="Error TextError TextError TextError Text"
      />
      <Alert
        title="Success Text"
        type="success"
        description="Success TextSuccess TextSuccess TextSuccess Text"
      />
      <Alert
        title="Warning Text"
        type="warning"
        description="Warning TextWarning TextWarning TextWarning Text"
      />
      <Alert title="Info Text" description="Info TextInfo TextInfo TextInfo Text" />
      <Menu
        className="test"
        onSelect={(index) => alert(index)}
        mode="horizontal"
        defaultOpenSubMenus={["4"]}
      >
        <MenuItem>active</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem>123</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>drop1</MenuItem>
        </SubMenu>
        <SubMenu title="opened">
          <MenuItem>opened1</MenuItem>
        </SubMenu>
      </Menu>
      <Tabs type="card" onSelect={(index) => alert(index)}>
        <TabItem label="tab1">content1</TabItem>
        <TabItem label="tab2">content2</TabItem>
        <TabItem label="disabled" disabled>
          content3
        </TabItem>
      </Tabs>
      <Icon theme="primary" icon="coffee" />
      <Icon theme="secondary" icon="ad" />
    </>
  );
};

export default App;
