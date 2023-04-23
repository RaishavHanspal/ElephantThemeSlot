import { slotGame } from "./Game";
import { game } from "./PositionData/config";
import { BaseGameScene } from "./Scene/BaseGameScene";
import { loadingScene } from "./Scene/loadingScene";

const slotConfig = {
    /** to use WEBGL or canvas wherever applicable */
    type: Phaser.AUTO,
    width: game.width,
    height: game.height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [loadingScene, BaseGameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: game.width,
        height: game.height,
    }
};

new slotGame(slotConfig);