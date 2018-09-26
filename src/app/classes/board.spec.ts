import { GoBoard } from "./board";

describe("A goboard dammit", () => {
    describe("getOpposingAdjacentStrings", () => {
        it('should return none if placing a piece next to no other piece', () => {
            const board = new GoBoard(3);
            // place in center
            const coordinateForBlack = [
                { x: 1, y: 1 }
            ]
            const cell = board.getPieceAtCoordinate(coordinateForBlack[0]);
            board.placePiece(cell, "black");
            const strings = board.getOpposingAdjacentStrings(cell);
            expect(strings.length).toBe(0);
        });

        it('should return none if placing a piece next to a piece of the same color', () => {
            const board = new GoBoard(3);
            // place in center
            const coordinateForBlack = [
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ]
            let cell = board.getPieceAtCoordinate(coordinateForBlack[0]);
            board.placePiece(cell, "black");
            cell = board.getPieceAtCoordinate(coordinateForBlack[1]);
            board.placePiece(cell, "black");
            const strings = board.getOpposingAdjacentStrings(cell);
            expect(strings.length).toBe(0);
        });
        it('should return one string of one piece if placing a piece next to one piece of the opposing color', () => {
            const board = new GoBoard(3);
            // place in center
            const midTop = { x: 1, y: 0 };
            const middle = { x: 1, y: 1 };
            let cell = board.getPieceAtCoordinate(midTop);
            board.placePiece(cell, "black");
            cell = board.getPieceAtCoordinate(middle);
            board.placePiece(cell, "white");
            const strings = board.getOpposingAdjacentStrings(cell);
            expect(strings.length).toBe(1);
        });
        it('should return one string of one piece if placing a piece next to one piece of the opposing color', () => {
            const board = new GoBoard(3);
            // place in center
            const midTop = { x: 1, y: 0 };
            const middle = { x: 1, y: 1 };
            let cell = board.getPieceAtCoordinate(midTop);
            board.placePiece(cell, "black");
            cell = board.getPieceAtCoordinate(middle);
            board.placePiece(cell, "white");
            const strings = board.getOpposingAdjacentStrings(cell);
            expect(strings.length).toBe(1);
        });
    });
    it('should deny placing a piece over a piece, that\s cheating', () => {
        const board = new GoBoard(1);
        const coordinateForBlack = [
            { x: 0, y: 0 }
        ]
        board.placePiecesAtCoordinates(coordinateForBlack, "black");
        const cell = board.getPieceAtCoordinate({x: 0, y: 0});
        expect(board.placePiece(cell, "white")).toBe(false);
    });

    it('should fuck up a single white piece surrounded by black pieces', () => {
        const board = new GoBoard(3);
        const coordinateForBlack = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 2, y: 1 },
        ]
        const coordinateForWhite = [
            { x: 1, y: 1 }
        ]
        board.placePiecesAtCoordinates(coordinateForBlack, "black");
        board.placePiecesAtCoordinates(coordinateForWhite, "white");
        const placementCell = board.getPieceAtCoordinate({x: 1, y:2});
        expect(placementCell).toBeTruthy();
        expect(board.getSurroundingCells(placementCell).length).toBe(3);
        board.placePiece(placementCell, "black");
        const surroundedCell = board.getPieceAtCoordinate(coordinateForWhite[0]);
        expect(surroundedCell.isNone()).toBe(true);
    });

    xit('should fuck up a two connecting white piece surrounded by black pieces', () => {
        const board = new GoBoard(4);
        const coordinateForBlack = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 1 },
        ]
        const coordinateForWhite = [
            { x: 1, y: 1 },
            { x: 1, y: 2 },
        ]
        board.placePiecesAtCoordinates(coordinateForBlack, "black");
        board.placePiecesAtCoordinates(coordinateForWhite, "white");
        const placementCell = board.getPieceAtCoordinate({x: 2, y:2});
        expect(board.getSurroundingCells(placementCell).length).toBe(4);
        board.placePiece(placementCell, "black");
        let surroundedCell;
        surroundedCell = board.getPieceAtCoordinate(coordinateForWhite[0]);
        expect(surroundedCell.isBlack()).toBe(true);
        surroundedCell = board.getPieceAtCoordinate(coordinateForWhite[1]);
        expect(surroundedCell.isBlack()).toBe(true);
    });
});