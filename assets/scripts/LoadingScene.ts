const { ccclass, property } = cc._decorator;

@ccclass
export class LoadingScene extends cc.Component {

    start() {
        cc.director.preloadScene('main', null, () => {
            cc.director.loadScene('main');
        });
    }
}
