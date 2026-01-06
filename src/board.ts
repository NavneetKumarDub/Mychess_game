import { Board, Piece, PieceColor } from './types';

export class ChessBoard {
  board: Board;

  constructor() {
    this.board = this.initializeBoard();
  }

  private initializeBoard(): Board {
    const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));

    // Initialize pawns
    for (let col = 0; col < 8; col++) {
      board[1][col] = { type: 'pawn', color: 'black' };
      board[6][col] = { type: 'pawn', color: 'white' };
    }

    // Initialize back row for black
    const backRowOrder: Piece['type'][] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    for (let col = 0; col < 8; col++) {
      board[0][col] = { type: backRowOrder[col], color: 'black' };
      board[7][col] = { type: backRowOrder[col], color: 'white' };
    }

    return board;
  }

  getPiece(row: number, col: number): Piece | null {
    if (row < 0 || row >= 8 || col < 0 || col >= 8) {
      return null;
    }
    return this.board[row][col];
  }

  setPiece(row: number, col: number, piece: Piece | null): void {
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      this.board[row][col] = piece;
    }
  }

  movePiece(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    const piece = this.getPiece(fromRow, fromCol);
    if (!piece) return false;

    this.setPiece(toRow, toCol, piece);
    this.setPiece(fromRow, fromCol, null);
    
    // Mark piece as having moved
    if (piece) {
      piece.hasMoved = true;
    }

    return true;
  }

  isInCheck(color: PieceColor): boolean {
    // Find king position
    let kingPos: { row: number; col: number } | null = null;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.getPiece(row, col);
        if (piece && piece.type === 'king' && piece.color === color) {
          kingPos = { row, col };
          break;
        }
      }
      if (kingPos) break;
    }

    if (!kingPos) return false;

    // Check if any opponent piece can attack the king
    const opponentColor: PieceColor = color === 'white' ? 'black' : 'white';
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.getPiece(row, col);
        if (piece && piece.color === opponentColor) {
          // Check if any opponent piece can reach the king's position
          if (this.canPieceReach(row, col, kingPos.row, kingPos.col)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  private canPieceReach(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    const piece = this.getPiece(fromRow, fromCol);
    if (!piece) return false;

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    switch (piece.type) {
      case 'pawn':
        // Pawns can attack diagonally one square forward
        const direction = piece.color === 'white' ? -1 : 1;
        return colDiff === 1 && (toRow - fromRow === direction);
      case 'rook':
        return (fromRow === toRow || fromCol === toCol) && this.isPathClear(fromRow, fromCol, toRow, toCol);
      case 'bishop':
        return rowDiff === colDiff && this.isPathClear(fromRow, fromCol, toRow, toCol);
      case 'queen':
        return ((fromRow === toRow || fromCol === toCol) || rowDiff === colDiff) && 
               this.isPathClear(fromRow, fromCol, toRow, toCol);
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
      case 'king':
        return rowDiff <= 1 && colDiff <= 1;
      default:
        return false;
    }
  }

  private isPathClear(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;

    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
      if (this.getPiece(currentRow, currentCol) !== null) {
        return false;
      }
      currentRow += rowStep;
      currentCol += colStep;
    }

    return true;
  }
}
