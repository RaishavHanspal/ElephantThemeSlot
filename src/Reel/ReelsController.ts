import { GameObjects } from "phaser";
import { EventConstants } from "../Constants/Events";
import { IReelConfig } from "../interface";
import { EventUtils } from "../Utilities/EventUtils";
import { TimeUtils } from "../Utilities/TimeUtils";
import { Reel } from "./Reel";
import { ReelGroup } from "./ReelGroup";

export class ReelsController {
    private reelGroup: ReelGroup;
    private spinButton: GameObjects.Sprite | GameObjects.Image;
    constructor(private scene: Phaser.Scene, private readonly reelsConfig?: IReelConfig) {
        this.initializeReels();
        this.addhandlers();
    }

    private initializeReels(): void {
        this.reelGroup = new ReelGroup(this.scene, 0, 0, null, this.reelsConfig);
    }

    /** assign handlers to buttons events */
    private addhandlers(): void {
        /** workaround to add window click event */
        // addEventListener("click", this.spin.bind(this));
        EventUtils.subscribe(EventConstants.onReelStopped, this.onReelStopped, this);
        EventUtils.subscribe(EventConstants.startStoppingReels, this.startStoppingReels, this);
        this.scene.input.enabled = true;
        this.scene.input.addListener("pointerup", this.spin, this);
    }

    /** remove the spin handler from stage click and add it to button click */
    public switchToButtonClick(spinButton: GameObjects.Sprite | GameObjects.Image): void {
        this.scene.input.removeListener("pointerup");
        this.spinButton = spinButton;
        this.spinButton.setInteractive();
        this.spinButton.on("pointerup", this.spin, this);
    }

    /** all the reels start spinning */
    private spin() {
        if (this.spinButton) {
            this.scene.tweens.add({
                targets: this.spinButton,
                duration: 100,
                alpha: this.reelsConfig.spinBlurAlpha
            })
        }
        this.spinButton ? this.spinButton.removeInteractive() : this.scene.input.enabled = false;
        this.reelGroup.reels.forEach((reel: Reel) => reel.spin());
        EventUtils.emit(EventConstants.spinClicked, null);
    }

    /** when the each reel stops and lands this fn is called */
    private onReelStopped(reelId: any) {
        const isLastReel: boolean = reelId === (this.reelsConfig.reelPositions.length - 1);
        if (isLastReel) {
            if (this.reelsConfig.spinButton && this.spinButton) {
                this.scene.tweens.add({
                    targets: this.spinButton,
                    duration: 100,
                    alpha: 1,
                    onComplete: () => {
                        this.spinButton ? this.spinButton.setInteractive() : this.scene.input.enabled = true;
                    }
                })
            }
            else {
                this.spinButton ? this.spinButton.setInteractive() : this.scene.input.enabled = true;
            }
            console.log("All Reels Stopped!");
        }
    }

    private startStoppingReels(): void{
        this.reelGroup.reels.forEach((reel: Reel) => reel.stop());
    }
}