const { ccclass, property } = cc._decorator;

@ccclass
export class Over extends cc.Component {
    
    @property(cc.Label)
    scoreLabel: cc.Label = null;
    @property(cc.Label)
    rankLabel: cc.Label = null;
    @property(cc.Node)
    restartButton: cc.Node = null;

    show(score: number, restartCb: Function, target: any) {
        this.node.active = true;
        this.scoreLabel.string = score.toFixed(1) + 's';
        let n = 100 - (score - 20);
        if (n > 100) {
            n = 100;
        }
        if (n < 0.1) {
            n = 0.1;
        }
        this.rankLabel.string = `超越了全村${n.toFixed(1)}%的月芽`
        this.restartButton.once(cc.Node.EventType.TOUCH_END, restartCb, target);
    }

    hide() {
        this.node.active = false;
    }
}