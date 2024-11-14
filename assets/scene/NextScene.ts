import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("NextScene")
export class NextScene extends Component {
  protected onLoad(): void {
    director.addPersistRootNode(this.node);
  }
  protected LoadNextScene(): void {
    director.loadScene("scene2");
  }
}
