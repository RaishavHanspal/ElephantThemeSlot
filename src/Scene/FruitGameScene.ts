import { Scene } from "phaser";
import { fruitReels } from "../PositionData/config";
import { ReelGroup } from "../Reel/ReelGroup";
import { ReelsController } from "../Reel/ReelsController";

export class FruitGameScene extends Scene{
    private reelsController: ReelsController;
    constructor(){
        super({key: "FruitGame"});
    }
    
    /** should load these images before setting the scene  - the things loaded here */
    preload() {
    }

    /** after the preload is completed this should initialize and align the loaded assets */
    create(){
        this.add.sprite(640, 360, "bg", "bg.jpg");
        const reelConfig: any = fruitReels;
        this.reelsController = new ReelsController(this, reelConfig);
        this.add.sprite(640, 360, "bg", "bg.png");
        this.initializeButtons();
    }

    /** initialize visible buttons on fruit game scene */
    initializeButtons(): void{
        this.reelsController.switchToButtonClick(this.add.sprite(200, 625, "buttons", "btn_play.png"));
        this.add.sprite(1000, 615, "buttons", "btn-spin.png");
        this.add.sprite(420, 615, "buttons", "btn-coin.png");
        this.add.sprite(595, 615, "buttons", "btn-coin.png");
        this.add.sprite(800, 615, "buttons", "btn-maxbet.png");       
    }
}