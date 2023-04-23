export class serverModel{
    private grid: number[][] = [];
    constructor(){
        this.setStoppingReel([[9, 7, 2, 3], [6, 4, 8, 0], [9, 0, 3, 7], [11, 3, 4, 2], [5, 5, 8, 6]]);
    }
    public setStoppingReel(grid: any) {
        this.grid = grid;
    }

    public getStoppingReel(): number[][] {
        return this.grid;
    }
}