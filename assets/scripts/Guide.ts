const { ccclass, property } = cc._decorator;

@ccclass
export class Over extends cc.Component {
    
    close() {
        this.node.active = false;
    }
}