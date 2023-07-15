import { Utils } from "phaser";
import { EventConstants } from "../Constants/Events";
import { EventUtils } from "../Utilities/EventUtils";
import { bgReels } from "../PositionData/config";

export class dummyServer {
    constructor() {
        this.addhandlers();
    }

    private addhandlers() {
        EventUtils.subscribe(EventConstants.spinRequest, this.spinRequestReceived, this);
    }

    private spinRequestReceived(): void {
        EventUtils.emit(EventConstants.spinResponse, {
            grid: this.generateRandomGrid()
        });
    }

    private generateRandomGrid(): Array<Array<any>> {
        const newGrid: any[][] = [];
        for(let i = 0; i < bgReels.reelPositions.length; i++){
            newGrid.push(Utils.Array.Shuffle(Array.apply(null, new Array(bgReels.symbolMap.length - 1)).map((id: number, i: number) => i)).slice(1, bgReels.symbolCount + 2));
        }
        return newGrid;
    }
}