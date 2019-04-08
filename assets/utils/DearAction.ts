export class DearAction {

    static leftX = -1000;
    static rightX = 1000;

    static moveCenterToLeft(target: cc.Node, cb?: Function, context?: any) {
        this.placeCenter(target);
        let action1 = cc.moveTo(0.5, this.leftX, 0).easing(cc.easeIn(2.0));
        let action2 = cc.callFunc(cb, context);
        let action = cc.sequence(action1, action2)
        target.runAction(action);
    }

    static moveCenterToRight(target: cc.Node, cb?: Function, context?: any) {
        this.placeCenter(target);
        let action1 = cc.moveTo(0.5, this.rightX, 0).easing(cc.easeIn(2.0));
        let action2 = cc.callFunc(cb, context);
        let action = cc.sequence(action1, action2);
        target.runAction(action);
    }

    static moveRightToCenter(target: cc.Node, cb?: Function, context?: any) {
        this.placeRight(target);
        let action1 = cc.moveTo(0.5, 0, 0).easing(cc.easeBackOut());
        let action2 = cc.callFunc(cb, context);
        let action = cc.sequence(action1, action2);
        target.runAction(action);
    }

    static moveLeftToCenter(target: cc.Node, cb?: Function, context?: any) {
        this.placeLeft(target);
        let action1 = cc.moveTo(0.5, 0, 0).easing(cc.easeBackOut());
        let action2 = cc.callFunc(cb, context);
        let action = cc.sequence(action1, action2);
        target.runAction(action);
    }


    static placeLeft(target: cc.Node) {
        target.x = this.leftX;
    }

    static placeRight(target: cc.Node) {
        target.x = this.rightX;
    }

    static placeCenter(target: cc.Node) {
        target.x = 0;
    }

}