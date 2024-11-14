import { _decorator, Component, Node, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("my_process_bar")
export class my_process_bar extends Component {
  @property({
    type: Sprite,
  })
  private bar: Sprite = null!;
  protected onLoad(): void {
    this.bar.fillRange = 0;
  }
  Fill_the_bar() {
    this.bar.fillRange += 0.1;
  }
  update(deltaTime: number) {}
}
