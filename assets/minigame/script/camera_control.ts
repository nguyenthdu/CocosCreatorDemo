import { _decorator, Component, misc, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("camera_control")
export class camera_control extends Component {
  @property({ type: Node })
  private player: Node;
  @property({ type: Node })
  private BG_Back: Node;
  @property({ type: Node })
  private BG_Front: Node;

  start() {}

  update(deltaTime: number) {
    let targetPos = this.player.getPosition();
    targetPos.y = misc.clampf(targetPos.y, 0, 220);
    let currentPos = this.node.getPosition();
    let newPos = currentPos.lerp(targetPos, 0.1);
    this.node.setPosition(newPos);
    //bg dung yen
    this.BG_Back.setPosition(currentPos.x, currentPos.y);
    this.BG_Front.setPosition(currentPos.x, currentPos.y);
  }
}
