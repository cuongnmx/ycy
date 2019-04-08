const { ccclass, property } = cc._decorator;

@ccclass
export class CommentItem extends cc.Component {

    @property(cc.Label)
    contentLabel: cc.Label = null;
    @property(cc.Label)
    likeCountsLabel: cc.Label = null;
    @property(cc.Node)
    likeIcon: cc.Node = null;
    @property(cc.Node)
    likedIcon: cc.Node = null;
    @property(cc.Node)
    dislikeIcon: cc.Node = null;
    @property(cc.Node)
    dislikedIcon: cc.Node = null;

    isPositive = true;
    likeCounds = 0;
    isCorrect = false;

    init(name: string, content: string, positive: boolean, index: number) {
        this.contentLabel.string = name + '：' + content;
        this.isPositive = positive;
        if (index === 0) {
            this.likeCounds = 101;
        } else {
            this.likeCounds = Math.floor(Math.random() * 2) - 3 * index + 100;
        }
        this.likeCountsLabel.string = this.likeCounds + '';
        this.resetLikeButton();
    }

    resetLikeButton() {
        this.likeIcon.active = true;
        this.dislikeIcon.active = true;
        this.likedIcon.active = false;
        this.dislikedIcon.active = false;
    }

    like() {
        this.likeCounds++;
        this.likeCountsLabel.string = this.likeCounds + '';
        this.likeIcon.active = false;
        this.likedIcon.active = true;
        this.isCorrect = this.isPositive;
        return this.isCorrect;
    }

    dislike() {
        this.dislikeIcon.active = false;
        this.dislikedIcon.active = true;
        this.isCorrect = !this.isPositive;
        return this.isCorrect;
    }

}
