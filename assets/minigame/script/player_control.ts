import {
  _decorator,
  Component,
  KeyCode,
  RigidBody2D,
  Vec2,
  Collider2D,
  Contact2DType,
  IPhysics2DContact,
  BoxCollider2D,
  input,
  Input,
  director,
  Event,
  UITransform,
  Prefab,
  instantiate,
  v2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  @property({
    type: Prefab,
  })
  private bombPrefab: Prefab = null!;
  private rigidBody: RigidBody2D = null!;
  private collider: BoxCollider2D = null!;
  private direction: number = 0;
  private onTheGround: boolean = false;
  private onTheBox: boolean = false; // Biến kiểm tra nhân vật đang đứng trên hộp

  private readonly velocityMaxX: number = 10;
  private readonly walkForce: number = 200;
  private readonly jumpForce: number = 15;

  onLoad() {
    let ground = this.node.parent?.getChildByName("Ground");
    // this.node.setPosition(
    //   -ground.getComponent(UITransform).width / 2 - ground.getPosition().x,
    //   100
    // );
    this.rigidBody = this.getComponent(RigidBody2D)!;
    this.collider = this.getComponent(BoxCollider2D)!;

    input.on(Input.EventType.KEY_DOWN, this.onKeyPressed, this);
    input.on(Input.EventType.KEY_UP, this.onKeyReleased, this);
    this.initializeCollisionListeners();
  }

  private initializeCollisionListeners() {
    if (this.collider) {
      this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyPressed, this);
    input.off(Input.EventType.KEY_UP, this.onKeyReleased, this);

    if (this.collider) {
      this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      this.collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  private onKeyPressed(event: any) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.direction = -1;
        break;
      case KeyCode.ARROW_RIGHT:
        this.direction = 1;
        break;
      case KeyCode.ARROW_UP:
        this.jump();
        break;
      case KeyCode.SPACE:
        this.ThrowBomb();
        break;
    }
  }

  private onKeyReleased(event: any) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        if (this.direction < 0) this.direction = 0;
        break;
      case KeyCode.ARROW_RIGHT:
        if (this.direction > 0) this.direction = 0;
        break;
    }
  }

  private jump() {
    if ((this.onTheGround || this.onTheBox) && this.rigidBody) {
      this.rigidBody.linearVelocity = new Vec2(
        this.rigidBody.linearVelocity.x,
        this.jumpForce
      );
      this.onTheGround = false;
      this.onTheBox = false; // Reset trạng thái khi nhảy lên
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    const normal = contact?.getWorldManifold().normal;
    if (otherCollider.tag === 2 && normal && normal.y !== 0) {
      this.onTheGround = true;
    } else if (otherCollider.tag === 4 && normal && normal.y !== 0) {
      this.onTheBox = true; // Đặt onTheBox thành true khi tiếp xúc với hộp
    }
  }

  onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.tag === 2) {
      this.onTheGround = false;
    } else if (otherCollider.tag === 4) {
      this.onTheBox = false; // Đặt onTheBox thành false khi rời khỏi hộp
    }
  }

  update(dt: number) {
    if (!this.rigidBody) return;

    let targetVelocityX = this.direction * this.velocityMaxX;
    let currentVelocityX = this.rigidBody.linearVelocity.x;
    let newVelocityX =
      currentVelocityX + (targetVelocityX - currentVelocityX) * 0.2;

    this.rigidBody.linearVelocity = new Vec2(
      newVelocityX,
      this.rigidBody.linearVelocity.y
    );
  }
  ThrowBomb() {
    let bomb = instantiate(this.bombPrefab);
    bomb.setParent(this.node.parent);
    let pos = this.node.getPosition();
    pos.x += 100;
    bomb.setPosition(pos);
    let rb = bomb.getComponent(RigidBody2D);
    // if (rb) {
    //   rb.linearVelocity = new Vec2(10, 0); // Tạo vận tốc cho quả bom
    // }
    rb.applyForceToCenter(new Vec2(10000, 0), true); // Tạo lực cho quả bom
  }
}
