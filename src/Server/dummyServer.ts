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
        // return Utils.Array.Shuffle([[9, 7, 2, 3], [6, 4, 8, 0], [9, 0, 3, 7], [11, 3, 4, 2], [5, 5, 8, 6]]);
        const newGrid: any[][] = [];
        for(let i = 0; i < bgReels.reelPositions.length; i++){
            newGrid.push(Utils.Array.Shuffle(Array.apply(null, new Array(bgReels.symbolMap.length - 1)).map((id: number, i: number) => i)).slice(1, bgReels.symbolCount + 2));
        }
        return newGrid;
    }
}