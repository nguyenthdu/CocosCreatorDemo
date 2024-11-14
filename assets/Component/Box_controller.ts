import { _decorator, color, Color, Component, Node, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Box_controller")
export class Box_controller extends Component {
  changeColor() {
    //change color node
    let color = new Color(255, 0, 0, 255);
    this.node.getComponent(Sprite).color = color;
  }
}
