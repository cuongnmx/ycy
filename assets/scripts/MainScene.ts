import { CommentItem } from "./CommentItem";
import { Timer } from "./Timer";
import { DearMath } from "../utils/DearMath";
import { CommentsData } from "./Config";
import { DearAction } from "../utils/DearAction";
import { Over } from "./Over";

const { ccclass, property } = cc._decorator;

@ccclass
export class MainScene extends cc.Component {

    @property(cc.Node)
    commentContainer: cc.Node = null;
    @property([CommentItem])
    commentItems: Array<CommentItem> = [];
    @property(cc.Node)
    likeButton: cc.Node = null;
    @property(cc.Node)
    dislikeButton: cc.Node = null;
    @property(cc.Node)
    switchButton: cc.Node = null;
    @property(Timer)
    timer: Timer = null;
    @property(cc.Label)
    correctRateLabel: cc.Label = null;
    @property(Over)
    over: Over = null;

    comments: Array<ICommentData>;
    isPlaying: boolean = false;
    currentIndex: number = 0;
    correctCounts: number = 0;
    wrongCounts: number = 0;

    start() {
        this.addEventListeners();
        // this.startGame();
    }

    startGame() {
        this.isPlaying = true;
        let len = this.commentItems.length;
        this.comments = this.getRandomComments(len);
        for (let i = 0; i < len; i++) {
            this.commentItems[i].init(this.comments[i].name, this.comments[i].content, this.comments[i].positive, i);
        }
        this.currentIndex = 0;
        this.correctCounts = 0;
        this.wrongCounts = 0;
        this.updateCorrectRate();
        this.timer.reset(0, 99999);
        this.timer.run();
        this.switchButton.active = false;
    }

    async overGame() {
        this.isPlaying = false;
        this.timer.stop();
        this.over.show(this.timer.time, this.onOverRestart, this);
    }

    judgeWin() {
        if (this.commentItems[0].isPositive && this.commentItems[1].isPositive && this.commentItems[2].isPositive) {
            return true;
        } else {
            return false;
        }
    }

    updateCorrectRate() {
        let totalCounts = this.correctCounts + this.wrongCounts;
        if (totalCounts === 0) {
            this.correctRateLabel.string = '正确率：0%';
        } else {
            this.correctRateLabel.string = '正确率：' + Math.floor(this.correctCounts / totalCounts * 100) + '%';
        }
    }

    addTime(time: number) {
        this.timer.time += time;
        // G.device.showToast('+' + time + 'S', 1000);
    }

    getRandomComments(n: number) {
        // let n1 = Math.floor(Math.random() * (n - 1)) + 1;
        // let n2 = n - n1;
        let positiveComments = DearMath.GetRandomSubArray(CommentsData.PositiveList, 3);
        let nagetiveComments = DearMath.GetRandomSubArray(CommentsData.NagetiveList, 2);
        let firstComment = nagetiveComments.pop();
        return [firstComment].concat(DearMath.ShuffleArray(positiveComments.concat(nagetiveComments)));
    }

    afterInput(isCorrect: boolean, sort: boolean = false) {
        if (isCorrect) {
            // G.device.vibrateShort();
            this.correctCounts++;
        } else {
            // G.device.vibrateLong();
            this.wrongCounts++;
            this.addTime(5);
        }
        this.updateCorrectRate();
        if (sort) {
            // sort
            if (this.currentIndex > 0) {
                let c1 = this.commentItems[this.currentIndex - 1];
                let c2 = this.commentItems[this.currentIndex];
                if (c2.likeCounds > c1.likeCounds) {
                    [c1.node.position, c2.node.position] = [c2.node.position, c1.node.position];
                    [this.commentItems[this.currentIndex], this.commentItems[this.currentIndex - 1]]
                        = [this.commentItems[this.currentIndex - 1], this.commentItems[this.currentIndex]];
                }
            }
        }
        this.currentIndex++;
        if (this.judgeWin()) {
            this.overGame();
            return;
        }
        if (this.currentIndex === this.commentItems.length) { 
            this.switchButton.active = true;
        }
    }

    onBtnLike() {
        if (!this.isPlaying) return;
        if (this.currentIndex < this.commentItems.length) {
            let isCorrect = this.commentItems[this.currentIndex].like();
            this.afterInput(isCorrect, true);
        }
    }

    onBtnDislike() {
        if (!this.isPlaying) return;
        if (this.currentIndex < this.commentItems.length) {
            let isCorrect = this.commentItems[this.currentIndex].dislike();
            this.afterInput(isCorrect);
        }
    }

    onBtnSwitchAccount() {
        if (!this.isPlaying) return;
        if (this.currentIndex === this.commentItems.length) {
            this.isPlaying = false;
            this.timer.stop();
            DearAction.moveCenterToLeft(this.commentContainer, () => {
                this.commentItems.forEach(item => item.resetLikeButton());
                DearAction.moveLeftToCenter(this.commentContainer, () => {
                    this.isPlaying = true;
                    this.currentIndex = 0;
                    this.switchButton.active = false;
                    this.timer.run();
                }, this);
            }, this);
        }
    }

    onOverRestart(): void {
        this.over.hide();
        this.startGame();
    }

    addEventListeners() {
        this.likeButton.on(cc.Node.EventType.TOUCH_END, this.onBtnLike, this);
        this.dislikeButton.on(cc.Node.EventType.TOUCH_END, this.onBtnDislike, this);
        this.switchButton.on(cc.Node.EventType.TOUCH_END, this.onBtnSwitchAccount, this);
    }

}

export interface ICommentData {
    name: string;
    content: string;
    positive: boolean;
}
