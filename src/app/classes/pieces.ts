export class GoPiece {
    public type = "" 
    public coordinates: Coordinates;

    constructor( _coordinates: Coordinates) {
        this.makeNone();
        this.coordinates = _coordinates;
    }

    public isWhite() {
        return this.type == GoPieceType.white;
    }

    public isBlack() {
        return this.type == GoPieceType.black;
    }

    public isNone() {
        return this.type == GoPieceType.none;
    }

    public makeWhite() {
        this.type = GoPieceType.white;
    }

    public makeBlack() {
        this.type = GoPieceType.black;
    }

    public makeNone() {
        this.type = GoPieceType.none;
    }

    public makeType( type: string ) {
        if (type == GoPieceType.white) {
            this.makeWhite();
        } else if (type == GoPieceType.black) {
            this.makeBlack();
        } else if (type == GoPieceType.none) {
            this.makeNone();
        } else {
            console.error('Attempt to convert GoPiece to unknown type ', type)
        }
    }
}

interface Coordinates {
    x: number;
    y: number;
}

export const GoPieceType = {
    none: "none",
    black: "black",
    white: "white",
}