import { _decorator, Color, Component, Node, Sprite, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Status_control")
export class Status_control extends Component {
  @property({ type: Node })
  private colorbox: Node;
  YESSSSS() {
    //change colorthis.
    this.colorbox.getComponent(Sprite).color = new Color(0, 255, 0);
  }
  NOOOOO() {
    //change colorthis.
    this.colorbox.getComponent(Sprite).color = new Color(255, 0, 0);
  }
}


