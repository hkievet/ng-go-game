import { GoPiece, GoPieceType, Coordinates, invertColor } from "./pieces";

export class GoBoard {
    // 9x9 by default
    public size: number = 9;
    public board: GoPiece[][];
    public PIECES = GoPiece;

    public constructor(size: number) {
        this.size = size;
        this.board = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(new GoPiece({ x: i, y: j }));
            }
            this.board.push(row);
        }
    }

    // for testing
    public placePiecesAtCoordinates( coordinatesArray: Coordinates[], pieceType: string ) {
        coordinatesArray.forEach( (coordinates: Coordinates) => {
            this.board[coordinates.x][coordinates.y].makeType(pieceType);
        })
    }

    public placePiece(placementCell: GoPiece, pieceType: string): boolean {
        // is valid move?
        if (!this.getPlacementError(placementCell, pieceType)) {
            placementCell.makeType(pieceType);
            const strings: GoPiece[][] = this.getOpposingAdjacentStrings(placementCell);

            strings.forEach( (stringPieces: GoPiece[]) => {
                const liberties = [];
                stringPieces.forEach((piece: GoPiece) => {
                    // surrounding but not already noted
                    const surroundingLiberties = this.getSurroundingCells(piece).filter( (cell) => {
                        if (cell.isNone()) {
                            const match = liberties.find( (liberty: GoPiece) => {
                                return liberty === cell;
                            });
                            if (match) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                        return false
                    });
                    if (surroundingLiberties && surroundingLiberties.length) {
                        liberties.push(...surroundingLiberties);
                    }
                });
                if (liberties.length === 0) {
                    //convert to None type, they are surrounded
                    stringPieces.forEach((piece: GoPiece) => {
                        piece.makeNone();
                    });
                }
            });
            return true;
        } else {
            return false;
        }
    }

    // returns empty string if valid, else returns an error
    public getPlacementError(basePiece: GoPiece, color: string): string {
        const opposingColor = invertColor(color);
        if (!basePiece.isNone()) {
            return "position is occupied"
        }

        // todo: check if the string surrounding the piece only has one eye and is surrounded. then it would be the last liberty and valid
        // AKA check if suicide or capture
        const surroundingCells = this.getSurroundingCells(basePiece);
        const immediateAdjacentOpposingPieces = surroundingCells.filter((cell: GoPiece) => {
            return cell.getColor() === opposingColor;
        });
        if (surroundingCells.length === immediateAdjacentOpposingPieces.length) {
            return "position is captured"
        }

        return "";
    }

    public getOpposingAdjacentStrings(basePiece: GoPiece): GoPiece[][] {
        const opposingColor = basePiece.getOpposite();
        const surroundingCells = this.getSurroundingCells(basePiece);
        const immediateAdjacentApposingPieces = surroundingCells.filter((cell: GoPiece) => {
            return cell.getColor() === opposingColor;
        });

        const opposingStrings: GoPiece[][] = [];

        immediateAdjacentApposingPieces.forEach((currentPiece: GoPiece) => {
            // check if piece is already in a string, if it is then ignore it.
            const isCatalogued = opposingStrings.find((pieceString: GoPiece[]) => {
                const innerMatch = pieceString.find((piece: GoPiece) => {
                    return piece === currentPiece;
                });
                return innerMatch != undefined;
            });

            if (!isCatalogued) {
                const newString = [];
                // the collection of pieces of opposingColor not already in newString
                const uncheckedPieces = [currentPiece];
                while (uncheckedPieces.length) {
                    const iterPiece = uncheckedPieces.pop();
                    newString.push(iterPiece);
                    // seek out all connecting pieces to currentPiece of type opposingColor
                    const currentRelevantAdjacentCells = this.getSurroundingCells(iterPiece).filter((surroundingPiece: GoPiece) => {
                        // only care about the ones not in newString and of color opposingColor
                        if (surroundingPiece.getColor() === opposingColor) {
                            const inString = newString.find((stringPiece: GoPiece) => {
                                return stringPiece === surroundingPiece;
                            });
                            return !inString;
                        } else {
                            return false;
                        }
                    });
                    uncheckedPieces.push(...currentRelevantAdjacentCells);
                }
                opposingStrings.push(newString);
            }
        });
        return opposingStrings
    }

    public getPieceAtCoordinate(coordinates: Coordinates): GoPiece {
        // TODO: error check coordinates
        return this.board[coordinates.x][coordinates.y];
    }

    public getSurroundingCells(origin: GoPiece): GoPiece[] {
        const surrounding = [];
        // LEFT
        if (origin.coordinates.x !== 0) {
            surrounding.push(this.board[origin.coordinates.x - 1][origin.coordinates.y])
        }

        // RIGHT
        if (origin.coordinates.x !== this.size - 1) {
            surrounding.push(this.board[origin.coordinates.x + 1][origin.coordinates.y])
        }

        // TOP
        if (origin.coordinates.y !== 0) {
            surrounding.push(this.board[origin.coordinates.x][origin.coordinates.y - 1])
        }

        // BOTTOM
        if (origin.coordinates.y !== this.size - 1) {
            surrounding.push(this.board[origin.coordinates.x][origin.coordinates.y + 1])
        }
        return surrounding;
    }
}