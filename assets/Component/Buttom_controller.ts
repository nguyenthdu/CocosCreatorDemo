import { _decorator, Component, Node } from "cc";
import { Box_controller } from "./Box_controller";
const { ccclass, property } = _decorator;

@ccclass("Buttom_controller")
export class Buttom_controller extends Component {
  @property({
    type: Node,
  })
  public box: Node = null;
  onLoad() {
    this.node.on(Node.EventType.TOUCH_START, this.buttonClick, this);
  }
  buttonClick() {
    let box_controller = this.box.getComponent(Box_controller);
    box_controller.changeColor();
  }
}
