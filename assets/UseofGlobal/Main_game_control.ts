import { _decorator, Component, EditBox, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Main_game_control")
export class Main_game_control extends Component {
  @property({
    type: EditBox,
  })
  public editBox: EditBox = null;
  @property({
    type: Label,
  })
  public label: Label = null;

  Save_data() {
    this.label.string = this.editBox.string;
  }
  Load_data() {
    this.editBox.string = this.label.string;
  }
  Load_Screen1() {}
  Load_Screen2() {}
}
