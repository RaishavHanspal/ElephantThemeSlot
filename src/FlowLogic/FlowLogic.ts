import { EventConstants } from "../Constants/Events";
import { EventUtils } from "../Utilities/EventUtils";

export class FlowLogic {
    constructor(){
        this.addhandlers();
    }

    private addhandlers(): void{
        EventUtils.subscribe(EventConstants.spinClicked, this.onSpinClicked, this);
        EventUtils.subscribe(EventConstants.parsingDone, this.onParsingDone, this);
    }

    private onSpinClicked(): void{
        EventUtils.emit(EventConstants.sendSpinRequest, null);
    }

    private onParsingDone(): void{
        EventUtils.emit(EventConstants.startStoppingReels, null);
    }
}