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
  public statusText = "Black to Move";
  public errorText = "";

  public errorTimeout;

  constructor() { 
    this.board = new GoBoard(9);
  }

  ngOnInit() {
  }

  public selectCell(cell: GoPiece) {
    if (this.errorTimeout) {
      this.clearErrorText();
      clearTimeout(this.errorTimeout);
    }
    const valid = this.board.placePiece(cell, this.currentColor);
    if (valid) {
      this.toggleCurrentColor();
    } else {
      this.errorText = "Invalid Move";
      this.errorTimeout = setTimeout( () => {
        this.clearErrorText();
      }, 1000)
    }
  };

  public clearErrorText() {
    this.errorText = "";
  }

  private toggleCurrentColor() {
    this.currentColor = this.currentColor === GoPieceType.white ? GoPieceType.black : GoPieceType.white;
    this.statusText = `${this.currentColor} to Move`;
  }
}
