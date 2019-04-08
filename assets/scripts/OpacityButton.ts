const { ccclass, property } = cc._decorator;

@ccclass
export class OpacityButton extends cc.Component {

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart() {
        this.node.opacity = 100;
    }

    onTouchEnd() {
        this.node.opacity = 30;
    }
}