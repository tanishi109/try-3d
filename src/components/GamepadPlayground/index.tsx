import * as React from "react";
import {Component} from "react";
import {RouteComponentProps} from "react-router";

interface Prop extends RouteComponentProps<{}> {}
interface State {}

class GamepadPlayground extends Component<Prop, State> {
  render() {
    return (
      <div>
        welcome to playground!
      </div>
    );
  }
}

export default GamepadPlayground;
