export interface IReelProperties{
    x: number;
    y: number;
}

export interface IReelConfig{
    spinType: "SceneUpdate-Phaser" | "RequestAnimationFrame" | "Tweens-Phaser";
    symbolLayering: string[];
    repetitions: number;
    spinSpeed: number;
    spinBlurAlpha: number;
    symbolImportType: string;
    symbolGap: number;
    y: number;
    x: number;
    reelGroupMaskOffsets: { x: number, y: number };
    spinDelay: number;
    spinButton: boolean;
    symbolWidth: number;
    symbolHeight: number;
    symbolCount: number;
    reelPositions: Array<IReelProperties>;
    symbolMap: Array<string> 
}