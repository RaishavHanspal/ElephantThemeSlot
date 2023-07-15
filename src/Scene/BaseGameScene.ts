import { Scene } from "phaser";
import { bgReels, game } from "../PositionData/config";
import { ReelsController } from "../Reel/ReelsController";
import { FlowLogic } from "../FlowLogic/FlowLogic";

export class BaseGameScene extends Scene{
    private reelsController: ReelsController;
    constructor(){
        super({key: "BaseGame"});
    }
    
    /** should load these images before setting the scene  - the things loaded here */
    public preload() {
    }

    /** after the preload is completed this should initialize and align the loaded assets */
    public create(){
        this.add.image(game.width / 2, game.height / 2, "baseGameBG");
        this.add.sprite(game.width / 2, game.height / 2 - 5, "reelSurround", "reelsFrameBasegameBG.png");
        this.add.sprite(game.width / 2, 67, "basic", "logo");
        const reelConfig: any = bgReels;
        this.reelsController = new ReelsController(this, reelConfig);
        new FlowLogic();
        this.initializeButtons();
    }

    private initializeButtons(): void{
        this.add.container(0, 0, [
            this.add.sprite(game.width / 2, game.height / 2 + 355, "ui", "meterBG.png"),
            this.add.sprite(game.width / 2, game.height / 2 + 344, "ui", "SpinButtonBG.png"),
            this.add.sprite(258, game.height / 2 + 355, "ui", "winMeter2.png"),
            this.add.sprite(915, game.height / 2 + 355, "ui", "winMeter.png"),
            this.add.sprite(1134, game.height / 2 + 355, "ui", "balanceMeter.png"),
            this.add.sprite(515, game.height / 2 + 355, "ui", "balanceMeter2.png"),
            this.add.sprite(1277, game.height / 2 + 359, "ui", "AutoSpin.png")
        ]).setName("ButtonConsole");
        this.reelsController.switchToButtonClick(this.add.sprite(game.width / 2, game.height / 2 + 355, "ui", "spinButton.png").setName("spin"));
    }

    public update(time: number, delta: number): void {
        this.reelsController.updateReels();
    }
}