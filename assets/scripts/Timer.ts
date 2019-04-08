const { ccclass, property } = cc._decorator;

@ccclass
export class Timer extends cc.Component {

    @property(cc.Label)
    timerLabel: cc.Label = null;

    private isStart = false;
    public time: number = 0;
    public order = 1;
    public completeTime: number = null;
    private completeCb: Function = null;
    public isTimeOver = false;

    public run() {
        this.schedule(this.tick, 0.1);
    }

    private tick() {
        this.time += 0.1 * this.order;
        if (this.completeTime !== null) {
            if (this.order > 0 ? this.time >= this.completeTime : this.time <= this.completeTime) {
                this.time = this.completeTime;
                this.isTimeOver = true;
                this.stop();
                if (this.completeCb) {
                    this.completeCb();
                }
            }
        }
        this.timerLabel.string = this.time.toFixed(1) + " s";
    }

    public stop() {
        this.unschedule(this.tick);
    }

    public reset(startTime: number, endTime: number, completeCb?: Function) {
        this.time = startTime;
        this.completeTime = endTime;
        this.order = endTime > startTime ? 1 : -1;
        this.isTimeOver = false;
        this.timerLabel.string = this.time + ".0 s";
        if (completeCb) {
            this.completeCb = completeCb;
        }
    }

    getTimeStr() {
        return this.timerLabel.string;
    }
}