import { Scene } from "phaser";
import { bgReels, game } from "../PositionData/config";
import { ReelsController } from "../Reel/ReelsController";

export class BaseGameScene extends Scene{
    private reelsController: ReelsController;
    constructor(){
        super({key: "BaseGame"});
    }
    
    /** should load these images before setting the scene  - the things loaded here */
    preload() {
    }

    /** after the preload is completed this should initialize and align the loaded assets */
    create(){
        this.add.image(game.width / 2, game.height / 2, "baseGameBG");
        this.add.sprite(game.width / 2, game.height / 2 - 5,"reelSurround", "reelsFrameBasegameBG.png");
        const reelConfig: any = bgReels;
        this.reelsController = new ReelsController(this, reelConfig);
        this.initializeButtons();
    }

    initializeButtons(): void{
        this.add.sprite(game.width / 2, game.height / 2 + 355, "ui", "meterBG.png");
        this.add.sprite(game.width / 2, game.height / 2 + 344, "ui", "SpinButtonBG.png");
        this.reelsController.switchToButtonClick(this.add.sprite(game.width / 2, game.height / 2 + 355, "ui", "spinButton.png"));
    }
}