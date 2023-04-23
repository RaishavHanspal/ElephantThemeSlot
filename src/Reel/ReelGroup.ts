import { GameObjects } from "phaser";
import { IReelConfig, IReelProperties } from "../interface";
import { Reel } from "./Reel";

export class ReelGroup extends GameObjects.Container{
    public reels: Reel[] = [];
    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: GameObjects.GameObject[], private readonly reelsConfig?: IReelConfig){
        super(scene, x, y, children);
        scene.add.existing(this);
        this.createReels();
        this.createReelGroupMask();
        return this;
    }

    public createReelGroupMask(){
        if(!this.reelsConfig.reelGroupMaskOffsets) return;
        const maskOffsetY: number = this.reelsConfig.reelGroupMaskOffsets.y || 0;
        const maskOffsetX: number = this.reelsConfig.reelGroupMaskOffsets.x || 0;
        const mask = this.scene.make.graphics({}, false).fillRect(this.x - this.reelsConfig.symbolWidth/2 - maskOffsetX, this.y - this.reelsConfig.symbolHeight/2 - maskOffsetY, 
        this.reelsConfig.symbolWidth + this.reelsConfig.reelPositions[this.reelsConfig.reelPositions.length - 1].x + (2 * maskOffsetX), (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap) * (this.reelsConfig.symbolCount) + (2 * maskOffsetY));
        mask.setName("reelMask");
        const maskObj = this.createGeometryMask(mask);
        this.setMask(maskObj);
    }

    /** creates all reels as per the properties in config */
    private createReels(): void{
        this.x = this.reelsConfig.x;
        this.y = this.reelsConfig.y;
        this.reelsConfig.reelPositions.forEach((reelProperties: IReelProperties, index: number) => {
            const reel: Reel = new Reel(this.scene, reelProperties.x, reelProperties.y, null, index, this.reelsConfig);
            reel.setName("reel"+ index);
            this.add(reel);
            this.reels.push(reel);
        });
    }

    /** collectively sets all the reels */
    public setStoppedReels(): void{
        this.reels.forEach((reel: Reel) => {
            reel.setStoppedReel();
        })
    }
}