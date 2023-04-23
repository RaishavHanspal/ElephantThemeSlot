import { EventConstants } from "../Constants/Events";
import { EventUtils } from "../Utilities/EventUtils";
import { serverModel } from "./serverModel";

export class serverCommunication{
    constructor(private model: serverModel){
        this.addhandlers();
    }

    private addhandlers(): void {
        EventUtils.subscribe(EventConstants.sendSpinRequest, this.spinRequest, this);
        EventUtils.subscribe(EventConstants.spinResponse, this.spinResponse, this);
    }

    private spinRequest(): void{
        EventUtils.emit(EventConstants.spinRequest, {});
    }

    private spinResponse(data?: any): void{   
        this.parseSpinResponse(data);
    }

    private parseSpinResponse(data?: any): void{
        this.model.setStoppingReel(data.grid);
        EventUtils.emit(EventConstants.parsingDone, null);
    }
}