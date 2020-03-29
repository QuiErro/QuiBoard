import React, { FC, CSSProperties } from "react";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface ProgressProps {
  /** Progress的进度 */
  percent: number;
  /** Progress的高度 */
  strokeHeight?: number;
  /** 是否显示进度文本 */
  showText?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
  /** Progress的类型 */
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, style, theme } = props;
  return (
    <div className="quib-progress-bar" style={style}>
      <div className="quib-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div className={`quib-progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
export default Progress;
