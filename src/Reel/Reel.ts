import { GameObjects, Utils } from "phaser";
import { EventConstants } from "../Constants/Events";
import { IReelConfig } from "../interface";
import { EventUtils } from "../Utilities/EventUtils";

export class Reel extends GameObjects.Container {
    private repeatitions: number = 0;
    private isSpinning: boolean = false;
    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: GameObjects.GameObject[], private id?: number, private readonly reelsConfig?: IReelConfig) {
        super(scene, x, y, children);
        this.setStoppedReel();
    }

    public setStoppedReel(): void {
        this.removeAll();
        this.removeAllListeners();
        const symbolArray: number[] = this.getRandomReel();
        symbolArray.forEach((symbolId: number, index) => {
            this.add(this.newSymbol(0, (index - 1) * (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap), this.reelsConfig.symbolMap[symbolId]));
        });
    }

    public getRandomReel() {
        const possibleSymbols = [0, 1, 2, 3, 4];
        return Utils.Array.Shuffle(possibleSymbols);
    }

    private newSymbol(x: number, y: number, frameName: string){
        let _newSymbol: GameObjects.Sprite | GameObjects.Image;
        switch(this.reelsConfig.symbolImportType){
            case "sprite": {
                _newSymbol = this.scene.add.sprite(x, y, "symbols", frameName);
            } break;
            case "image": {
                _newSymbol = this.scene.add.image(x, y, frameName);
            } break;
        }
        return _newSymbol;
    }

    public onSymbolShifted():void{
        this.y = 0;
        this.repeatitions++;
        this.getAll().forEach((symbol: GameObjects.Image) => {
            if (symbol.y < ((this.reelsConfig.symbolCount - 1) * (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap))) {
                symbol.y += (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap);
            }
            else {
                symbol.y = - (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap);
            }
        });
    }

    public spin() {
        this.repeatitions = 0;
        this.isSpinning = true;
        this.scene.tweens.add({
            targets: this,
            alpha: this.reelsConfig.spinBlurAlpha || 0.5,
            duration: this.reelsConfig.spinSpeed || 100,
        });
        if(this.reelsConfig.requestAnimationFrame){
            this.RAFSpin();
        }
        else {
            this.tweenSpin();
        }
    } 
    
    /** enable reel spinning using tween */
    private tweenSpin(): void{
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
    private RAFSpin(): void{
        if(!this.isSpinning) return;
        requestAnimationFrame(this.RAFSpin.bind(this));
        this.y += 25;
        if(this.y >= (this.reelsConfig.symbolHeight + this.reelsConfig.symbolGap)){
            this.onSymbolShifted();
            if(this.repeatitions >= this.reelsConfig.repetitions){
                this.onReelStopped();
            }
        }
    }

    /** once the reel stops after the spin complete */
    private onReelStopped(): void{
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