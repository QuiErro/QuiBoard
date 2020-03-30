import React, { FC, useState } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";

export type AlertType = "success" | "default" | "danger" | "warning";

export interface AlertProps {
  /** Alert的标题 必选属性 */
  title: string;
  /** Alert的描述 */
  description?: string;
  /** Alert的类型 */
  type?: AlertType;
  /** 关闭Alert */
  onClose?: () => void;
  /** 是否显示关闭图标 */
  closable?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false);
  const { title, description, type, onClose, closable } = props;
  const classes = classNames("quib-alert", {
    [`quib-alert-${type}`]: type,
  });
  /*
  const titleClass = classNames('quib-alert-title', {
    'bold-title': description
  })
  */
  const titleClass = classNames("quib-alert-title");
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setHide(true);
  };
  return (
    <Transition in={!hide} timeout={300} animation="zoom-in-top">
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="quib-alert-desc">{description}</p>}
        {closable && (
          <span className="quib-alert-close" onClick={handleClose}>
            <Icon size="xs" icon="times" />
          </span>
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: "default",
  closable: true,
};
export default Alert;
