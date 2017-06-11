import * as React from "react";
import {Component} from "react";
import {RouteComponentProps} from "react-router";

import GamepadManager from "./GamepadManager";

interface Prop extends RouteComponentProps<{}> {}
interface State {
  buttons: GamepadButton[];
}

class GamepadPlayground extends Component<Prop, State> {
  constructor() {
    super();

    this.state = {
      buttons: [],
    };
  }

  componentDidMount() {
    new GamepadManager((gamepad: Gamepad) => { // tslint:disable-line no-unused-expression
      this.setState({
        buttons: gamepad.buttons,
      });
    });
  }

  render() {
    return (
      <div>
        {this.renderButtons()}
      </div>
    );
  }

  private renderButtons() {
    const {buttons} = this.state;

    return buttons.map((btn, i) => {
      return (
        <div key={i}>
          <h4>{`btn_${i}`}</h4>
          <span>pressed: {btn.pressed + ""}</span>
        </div>
      );
    });
  }
}

export default GamepadPlayground;
