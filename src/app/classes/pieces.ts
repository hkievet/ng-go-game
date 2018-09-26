export class GoPiece {
    public color = "" 
    public coordinates: Coordinates;

    constructor( _coordinates: Coordinates) {
        this.makeNone();
        this.coordinates = _coordinates;
    }

    public isWhite() {
        return this.color == GoPieceType.white;
    }

    public isBlack() {
        return this.color == GoPieceType.black;
    }

    public isNone() {
        return this.color == GoPieceType.none;
    }

    public makeWhite() {
        this.color = GoPieceType.white;
    }

    public makeBlack() {
        this.color = GoPieceType.black;
    }

    public makeNone() {
        this.color = GoPieceType.none;
    }

    public getOpposite() {
        return invertColor(this.getColor());
    }

    public getColor() {
        return this.color;
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

export function invertColor(color: string): string {
    if (color === GoPieceType.none) {
        return GoPieceType.none;
    }
    return color === GoPieceType.black ? GoPieceType.white : GoPieceType.black;
}

export interface Coordinates {
    x: number;
    y: number;
}

export const GoPieceType = {
    none: "none",
    black: "black",
    white: "white",
}