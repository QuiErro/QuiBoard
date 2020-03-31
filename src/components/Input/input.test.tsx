import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Input, InputProps } from "./input";

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: "this is input",
};
describe("test Input component", () => {
  it("should render the correct default Input", () => {
    const wrapper = render(<Input {...defaultProps} />);
    const testNode = wrapper.getByPlaceholderText("this is input") as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass("quib-input-inner");
    fireEvent.change(testNode, { target: { value: "改变value" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual("改变value");
  });
  it("should render the disabled Input on disabled property", () => {
    const wrapper = render(<Input disabled placeholder="disabled" />);
    const testNode = wrapper.getByPlaceholderText("disabled") as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it("should render different input sizes on size property", () => {
    const wrapper = render(<Input placeholder="the large size" size="lg" />);
    const testContainer = wrapper.container.querySelector(".quib-input-wrapper");
    expect(testContainer).toHaveClass("input-size-lg");
  });
  it("should render prepand and append element on prepand/append property", () => {
    const { queryByText, container } = render(
      <Input placeholder="the input with pend" prepend="https://" append=".com" />,
    );
    const testContainer = container.querySelector(".quib-input-wrapper");
    expect(testContainer).toHaveClass("input-group input-group-append input-group-prepend");
    expect(queryByText("https://")).toBeInTheDocument();
    expect(queryByText(".com")).toBeInTheDocument();
  });
});
