module.exports = {
    reels: {
        symbolWidth: 141,
        symbolHeight: 121,
        symbolCount: 4,
        x: 287,
        y: 150,
        symbolGap: 5,
        spinDelay: 150,
        spinBlurAlpha: 0.4,
        spinSpeed: 100,
        repetitions: 20,
        reelGroupMaskOffsets: {
            x: 0,
            y: 0
        },
        reelPositions: [{
                x: 0,
                y: 0
            },
            {
                x: 141,
                y: 0
            },
            {
                x: 282,
                y: 0
            },
            {
                x: 423,
                y: 0
            },
            {
                x: 564,
                y: 0
            },
            {
                x: 705,
                y: 0
            }
        ],
        symbolImportType: "image",
        symbolMap: [
            "BAR",
            "2xBAR",
            "3xBAR",
            "7",
            "Cherry"
        ]
    },
    bgReels: {
        requestAnimationFrame: true,
        symbolWidth: 258,
        symbolHeight: 150,
        symbolCount: 4,
        x: 250,
        y: 121,
        symbolGap: -5,
        spinDelay: 150,
        reelGroupMaskOffsets: {
            y: 0,
            x: 0
        },
        spinButton: true,
        spinBlurAlpha: 0.4,
        spinSpeed: 100,
        repetitions: 20,
        reelPositions: [{
                x: 0,
                y: 0
            },
            {
                x: 195,
                y: 0
            },
            {
                x: 390,
                y: 0
            },
            {
                x: 585,
                y: 0
            },
            {
                x: 780,
                y: 0
            }
        ],
        symbolImportType: "sprite",
        symbolMap: [
            "B01_Static.png",
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
        ]
    },
    game: {
        width: 1280,
        height: 720
    }
}