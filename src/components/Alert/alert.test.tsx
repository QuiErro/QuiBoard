import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import Alert, { AlertProps } from "./alert";

jest.mock("../Icon/icon", () => {
  return (props: any) => {
    return <span>{props.icon}</span>;
  };
});

const defaultProps = {
  title: "This is a Test",
  onClose: jest.fn(),
};

const testProps: AlertProps = {
  title: "This is a Test",
  description: "This is some info about the test",
  type: "success",
  closable: false,
};

describe("test Alert component", () => {
  it("should render the correct default alert", async () => {
    const { getByText, container, queryByText } = render(<Alert {...defaultProps} />);
    // 测试类型
    expect(container.querySelector(".quib-alert")).toHaveClass("quib-alert-default");
    // 测试标题
    expect(queryByText("This is a Test")).toBeInTheDocument();
    // 模拟点击关闭图标
    fireEvent.click(getByText("times"));
    expect(defaultProps.onClose).toHaveBeenCalled();
    // 测试点击关闭图标后，是否隐藏Alert组件
    await wait(() => {
      expect(queryByText("This is a Test")).not.toBeInTheDocument();
    });
  });
  it("should render the correct Alert based on different type and description", () => {
    const { container, queryByText } = render(<Alert {...testProps} />);
    // 测试类型
    expect(container.querySelector(".quib-alert")).toHaveClass("quib-alert-success");
    // 测试标题
    expect(queryByText("This is a Test")).toHaveClass("quib-alert-title");
    // 测试描述
    expect(queryByText("This is some info about the test")).toBeInTheDocument();
    // 测试关闭图标是否显示
    expect(queryByText("times")).not.toBeInTheDocument();
  });
});
