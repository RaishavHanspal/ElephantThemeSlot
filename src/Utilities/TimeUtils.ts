import { Game, Scene } from "phaser";

export class TimeUtils{
    public static setTimeOut(delay: number, scene: Scene,callback: () => void, callbackScope: any, repeat?: number, loop?: boolean){
        scene.time.addEvent({
            delay,
            repeat,
            callback,
            callbackScope,
            loop
        });
    }
}