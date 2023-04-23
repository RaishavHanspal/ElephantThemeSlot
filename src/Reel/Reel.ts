import { GameObjects, Utils } from "phaser";
import { EventConstants } from "../Constants/Events";
import { IReelConfig } from "../interface";
import { EventUtils } from "../Utilities/EventUtils";
import { serverModel } from "../Server/serverModel";
import { TimeUtils } from "../Utilities/TimeUtils";

export class Reel extends GameObjects.Container {
    private repeatitions: number = 0;
    private isSpinning: boolean = false;
    private symLayeringArray: any[] = [];
    private startStoppingReel: boolean = false;
    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: GameObjects.GameObject[], private id?: number, private readonly reelsConfig?: IReelConfig) {
        super(scene, x, y, children);
        this.setStoppedReel();
    }

    public setStoppedReel(): void {
        this.removeAll();
        this.removeAllListeners();
        const symbolArray: any[] = this.getReelPositions();
        symbolArray.forEach((symbolId: number, index) => {
            this.add(this.newSymbol(symbolId, index));
        });
    }

    public getReelPositions(): any[] {
        return ((window as any).slotServerModel as serverModel).getStoppingReel()[this.id];
    }

    private newSymbol(symbolId: number, index: number) {
        const x: number = 0;
        const y = (index - 1) * (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap)
        const frameName: string = this.reelsConfig.symbolMap[symbolId];
        let _newSymbol: GameObjects.Sprite | GameObjects.Image;
        switch (this.reelsConfig.symbolImportType) {
            case "sprite": {
                _newSymbol = this.scene.add.sprite(x, y, "symbols", frameName);
            } break;
            case "image": {
                _newSymbol = this.scene.add.image(x, y, frameName);
            } break;
        }
        this.updateSymbolLayering(_newSymbol, frameName);
        return _newSymbol;
    }

    private updateSymbolLayering(_newSymbol: GameObjects.Sprite | GameObjects.Image, frameName: string) {
        if (!this.reelsConfig.symbolLayering) return;
        if (this.reelsConfig.symbolLayering.includes(frameName)) {
            this.symLayeringArray.push(_newSymbol);
        }
        this.symLayeringArray.forEach((symbol: GameObjects.Sprite | GameObjects.Image) => {
            this.bringToTop(symbol);
        })
    }

    public onSymbolShifted(): void {
        this.y = 0;
        if (this.startStoppingReel) {
            this.repeatitions++;
        }
        this.getAll().forEach((symbol: GameObjects.Image) => {
            if (symbol.y < ((this.reelsConfig.symbolCount - 1) * (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap))) {
                symbol.y += (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap);
            }
            else {
                symbol.y = - (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap);
                if ((this.reelsConfig.repetitions - this.repeatitions) <= this.reelsConfig.symbolCount) {
                    const newSymbolId: number = this.getReelPositions()[(this.reelsConfig.repetitions - this.repeatitions)];
                    const _newSymbol = this.newSymbol(newSymbolId, this.reelsConfig.repetitions - this.repeatitions);
                    this.add(_newSymbol);
                    _newSymbol.setPosition(symbol.x, symbol.y);
                    symbol.destroy();
                }
            }
        });
    }

    public spin() {
        this.repeatitions = 0;
        this.isSpinning = true;
        this.startStoppingReel = false;
        TimeUtils.setTimeOut(this.reelsConfig.spinDelay * this.id, this.scene, () => {
            this.scene.tweens.add({
                targets: this,
                alpha: this.reelsConfig.spinBlurAlpha || 0.5,
                duration: this.reelsConfig.spinSpeed || 100,
            });
            if (this.reelsConfig.requestAnimationFrame) {
                this.RAFSpin();
            }
            else {
                this.tweenSpin();
            }
        }, this);
    }

    public stop() {
        this.startStoppingReel = true;
    }

    /** enable reel spinning using tween */
    private tweenSpin(): void {
        this.scene.tweens.add({
            targets: this,
            y: (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap || 0),
            duration: this.reelsConfig.spinSpeed || 100,
            repeat: this.reelsConfig.repetitions || 10,
            onRepeat: () => {
                this.onSymbolShifted();
            },
            onComplete: () => {
                this.onSymbolShifted();
                this.onReelStopped();
            },
        })

    }

    /** using Request animation frame */
    private RAFSpin(): void {
        if (!this.isSpinning) return;
        requestAnimationFrame(this.RAFSpin.bind(this));
        this.y += 25;
        if (this.y >= (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap)) {
            this.onSymbolShifted();
            if (this.repeatitions >= this.reelsConfig.repetitions) {
                this.onReelStopped();
            }
        }
    }

    /** once the reel stops after the spin complete */
    private onReelStopped(): void {
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: this.reelsConfig.spinSpeed || 100,
        });
        console.log("Symbol shifted Count ", this.repeatitions);
        this.isSpinning = false;
        EventUtils.emit(EventConstants.onReelStopped, this.id);
    }
}