import { Scene } from "phaser";
import { reels } from "../PositionData/config";
import { ReelGroup } from "../Reel/ReelGroup";
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
        this.add.image(0, 0, "baseGameBG").setScale(2);
        const reelConfig: any = reels;
        new ReelsController(this, reelConfig);
    }
}