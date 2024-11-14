import { _decorator, Component, director, PhysicsSystem2D } from "cc";
const { ccclass, property } = _decorator;

@ccclass("main_game_control")
export class main_game_control extends Component {
  onLoad() {
    PhysicsSystem2D.instance.enable = true;
  }
}
