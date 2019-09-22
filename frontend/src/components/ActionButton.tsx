import * as React from "react";
import { Icon, Button } from "semantic-ui-react";

type Props = {
  name: string;
  transparent: boolean;
  onClick: Function;
  icon?: string;
  disabled?: boolean;
};

const ActionButton = (props: Props) => {
  const { icon, name, transparent, onClick, disabled } = props;
  return (
    <Button
      onClick={() => onClick()}
      style={{
        backgroundColor: transparent ? "transparent" : "#fc4838",
        color: transparent ? "#fc4838" : "#fff",
        borderRadius: "0.3em"
      }}
      disabled={disabled}
    >
      {icon && <Icon name={icon} />} {name}
    </Button>
  );
};

export default ActionButton;
