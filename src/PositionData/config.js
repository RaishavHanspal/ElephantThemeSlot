module.exports = {
    bgReels: {
        spinType: "SceneUpdate-Phaser", // SceneUpdate-Phaser, RequestAnimationFrame or Tweens-Phaser
        symbolWidth: 258,
        symbolHeight: 150,
        symbolCount: 3,
        x: 330,
        y: 309,
        symbolGap: 0,
        spinDelay: 150,
        reelGroupMaskOffsets: {
            y: 0,
            x: 200
        },
        spinButton: true,
        spinBlurAlpha: 0.4,
        spinSpeed: 100,
        repetitions: 20,
        reelPositions: [{
                x: -52,
                y: 0
            },
            {
                x: 170,
                y: 0
            },
            {
                x: 392,
                y: 0
            },
            {
                x: 614,
                y: 0
            },
            {
                x: 836,
                y: 0
            }
        ],
        symbolImportType: "sprite",
        symbolMap: [
            "S01_Static.png",
            "S02_Static.png",
            "S03_Static.png",
            "S04_Static.png",
            "S05_Static.png",
            "S06_Static.png",
            "S07_Static.png",
            "S08_Static.png",
            "S09_Static.png",
            "W01_Static.png"
        ],
        symbolLayering: [
            "W01_Static.png"
        ]
    },
    game: {
        width: 1440,
        height: 810
    }
}