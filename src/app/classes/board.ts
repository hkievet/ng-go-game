import { GoPiece } from "./pieces";

export class GoBoard {
    // 9x9 by default
    public size: number = 9;
    public board: GoPiece[][];
    public PIECES = GoPiece;

    public constructor(size: number) {
        this.board = [];
        for (let i = 0; i < size; i++){
            const row = [];
            for (let j = 0; j < size; j++){
                row.push(new GoPiece( { x: i, y: j}));
            }
            this.board.push(row);
        }
    }
}