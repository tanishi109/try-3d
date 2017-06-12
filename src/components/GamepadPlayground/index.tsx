import * as React from "react";
import {Component} from "react";
import {RouteComponentProps} from "react-router";

import GamepadManager from "./GamepadManager";

interface Prop extends RouteComponentProps<{}> {}
interface State {
  buttons: GamepadButton[];
  axes: number[];
}

class GamepadPlayground extends Component<Prop, State> {
  constructor() {
    super();

    this.state = {
      buttons: [],
      axes: [],
    };
  }

  componentDidMount() {
    new GamepadManager((gamepad: Gamepad) => { // tslint:disable-line no-unused-expression
      this.setState({
        buttons: gamepad.buttons,
        axes: gamepad.axes,
      });
    });
  }

  render() {
    return (
      <div style={{display: "flex"}}>
        <div style={{marginLeft: "32px"}}>
          {this.renderButtons()}
        </div>
        <div style={{marginLeft: "32px"}}>
          {this.renderAxes()}
        </div>
      </div>
    );
  }

  private renderButtons() {
    const {buttons} = this.state;

    return buttons.map((btn, i) => {
      return (
        <div key={`buttons_${i}`}>
          <h4>{`btn_${i}`}</h4>
          <span>pressed: {btn.pressed + ""}</span>
        </div>
      );
    });
  }

  private renderAxes() {
    const {axes} = this.state;

    return axes.map((ax, i) => {
      return (
        <div key={`axes_${i}`}>
          <span>ax: {ax}</span>
        </div>
      );
    });
  }
}

export default GamepadPlayground;
