import { Component, OnInit } from '@angular/core';
import { GoBoard } from '../classes/board';
import { GoPiece, GoPieceType } from '../classes/pieces';

@Component({
  selector: 'app-go-game',
  templateUrl: './go-game.component.html',
  styleUrls: ['./go-game.component.scss']
})
export class GoGameComponent implements OnInit {
  public board: GoBoard;
  public pieceTypes = GoPieceType;
  
  public currentColor = GoPieceType.black;

  constructor() { 
    this.board = new GoBoard(9);
  }

  ngOnInit() {
  }

  public selectCell(cell: GoPiece) {
    console.log(cell);
    if (cell.isNone()) {
      // is valid move?
      cell.makeType(this.currentColor);
      this.toggleCurrentColor();
    }
  };

  private toggleCurrentColor() {
    this.currentColor = this.currentColor === GoPieceType.white ? GoPieceType.black : GoPieceType.white;
  }
}
