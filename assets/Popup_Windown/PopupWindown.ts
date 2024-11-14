import {
  _decorator,
  Component,
  EventHandler,
  Node,
  tween,
  UIOpacity,
  v3,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PopupWindown")
export class PopupWindown extends Component {
  private uiOpacity: UIOpacity | null = null;

  onLoad() {
    // Kiểm tra và thêm component UIOpacity nếu node chưa có
    this.uiOpacity = this.node.getComponent(UIOpacity);
    if (!this.uiOpacity) {
      this.uiOpacity = this.node.addComponent(UIOpacity);
    }
  }

  Show_windown() {
    this.node.active = true;
    this.node.scale = new Vec3(0.5, 0.5, 1); // Bắt đầu với kích thước nhỏ
    if (this.uiOpacity) {
      this.uiOpacity.opacity = 0; // Bắt đầu với độ mờ dần
    }

    tween(this.node)
      .to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: "quadInOut" }) // Phóng to dần
      .start();

    if (this.uiOpacity) {
      tween(this.uiOpacity)
        .to(0.5, { opacity: 255 }, { easing: "quadInOut" }) // Hiện ra dần
        .start();
    }
  }

  Hide_windown() {
    tween(this.node)
      .to(0.5, { scale: new Vec3(0.5, 0.5, 1) }, { easing: "quadInOut" }) // Thu nhỏ lại
      .start();

    if (this.uiOpacity) {
      tween(this.uiOpacity)
        .to(0.5, { opacity: 0 }, { easing: "quadInOut" }) // Làm mờ dần
        .call(() => {
          this.node.active = false;
        })
        .start();
    }
  }
}
