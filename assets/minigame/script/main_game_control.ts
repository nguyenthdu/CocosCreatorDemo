import {
  _decorator,
  Component,
  director,
  Input,
  input,
  Node,
  PhysicsSystem2D,
  v2,
} from "cc";
import { PlayerControl } from "./player_control";
const { ccclass, property } = _decorator;

@ccclass("main_game_control")
export class main_game_control extends Component {
  @property({
    type: PlayerControl,
  })
  public playerControl: PlayerControl;
  protected onLoad(): void {
    this.initListener();
  }
  initListener() {}
}
