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
    fruitReels: {
        requestAnimationFrame: true,
        symbolWidth: 112,
        symbolHeight: 94,
        symbolCount: 4,
        x: 344,
        y: 158,
        symbolGap: 16,
        spinDelay: 150,
        // reelGroupMaskOffsets: {
        //     y: 16
        // },
        spinButton: true,
        spinBlurAlpha: 0.4,
        spinSpeed: 100,
        repetitions: 20,
        reelPositions: [{
                x: 0,
                y: 0
            },
            {
                x: 150,
                y: 0
            },
            {
                x: 300,
                y: 0
            },
            {
                x: 450,
                y: 0
            },
            {
                x: 600,
                y: 0
            }
        ],
        symbolImportType: "sprite",
        symbolMap: [
            "symbols_0.png",
            "symbols_1.png",
            "symbols_2.png",
            "symbols_3.png",
            "symbols_4.png",
            "symbols_5.png",
            "symbols_6.png",
            "symbols_7.png",
            "symbols_8.png",
            "symbols_9.png",
        ]
    },
    game: {
        width: 1280,
        height: 720
    }
}