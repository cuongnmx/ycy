const { ccclass, property } = cc._decorator;

@ccclass
export class LoadingScene extends cc.Component {

    start() {
        cc.director.preloadScene('main', null, () => {

        });
        this.scheduleOnce(() => {
            cc.director.loadScene('main');
        }, 3);
    }
}
