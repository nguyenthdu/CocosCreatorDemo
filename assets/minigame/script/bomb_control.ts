import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("bomb_control")
export class bomb_control extends Component {
  RemoveBomb() {
    this.node.destroy();
  }
  start() {}

  update(deltaTime: number) {}
}
