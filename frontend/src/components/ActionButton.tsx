import * as React from "react";
import { Icon, Button } from "semantic-ui-react";

type Props = {
  icon: string,
  name: string,
  transparent: boolean,
}

export class ActionButton extends Component<Props> {
  render() {
    console.log(JSON.stringify(this.props));
    const { icon, name, transparent } = this.props;
    return (
      <Button 
        style={{
          backgroundColor: (transparent ? 'transparent' : '#fc4838'),
          color: (transparent ? '#fc4838' : '#fff'),
          borderRadius: "0.3em",
        }}>
        {icon && <Icon name={icon}/>} {name}
      </Button>
    )
  }
};

export default (ActionButton);
