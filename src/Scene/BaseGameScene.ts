import { Scene } from "phaser";
import { bgReels } from "../PositionData/config";
import { ReelsController } from "../Reel/ReelsController";

export class BaseGameScene extends Scene{
    constructor(){
        super({key: "BaseGame"});
    }
    
    /** should load these images before setting the scene  - the things loaded here */
    preload() {
    }

    /** after the preload is completed this should initialize and align the loaded assets */
    create(){
        this.add.image(640, 360, "baseGameBG")
        const reelConfig: any = bgReels;
        new ReelsController(this, reelConfig);
    }
}