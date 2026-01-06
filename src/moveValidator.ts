import { ChessBoard } from './board';
import { Piece, PieceColor, Position } from './types';

export class MoveValidator {
  constructor(private board: ChessBoard) {}

  isValidMove(from: Position, to: Position, color: PieceColor): boolean {
    const piece = this.board.getPiece(from.row, from.col);
    
    // Check if there's a piece at the source
    if (!piece) return false;
    
    // Check if the piece belongs to the current player
    if (piece.color !== color) return false;
    
    // Check if destination is within bounds
    if (to.row < 0 || to.row >= 8 || to.col < 0 || to.col >= 8) return false;
    
    // Check if destination has a piece of the same color
    const destPiece = this.board.getPiece(to.row, to.col);
    if (destPiece && destPiece.color === color) return false;

    // Validate move based on piece type
    if (!this.isValidPieceMove(piece, from, to)) return false;

    // Check if path is clear (for pieces that can't jump)
    if (piece.type !== 'knight' && !this.isPathClear(from, to)) return false;

    return true;
  }

  private isValidPieceMove(piece: Piece, from: Position, to: Position): boolean {
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;
    const absRowDiff = Math.abs(rowDiff);
    const absColDiff = Math.abs(colDiff);

    switch (piece.type) {
      case 'pawn':
        return this.isValidPawnMove(piece, from, to, rowDiff, colDiff);
      case 'rook':
        return (from.row === to.row || from.col === to.col) && (rowDiff !== 0 || colDiff !== 0);
      case 'knight':
        return (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);
      case 'bishop':
        return absRowDiff === absColDiff && absRowDiff > 0;
      case 'queen':
        return ((from.row === to.row || from.col === to.col) || absRowDiff === absColDiff) && 
               (rowDiff !== 0 || colDiff !== 0);
      case 'king':
        return absRowDiff <= 1 && absColDiff <= 1 && (rowDiff !== 0 || colDiff !== 0);
      default:
        return false;
    }
  }

  private isValidPawnMove(piece: Piece, from: Position, to: Position, rowDiff: number, colDiff: number): boolean {
    const direction = piece.color === 'white' ? -1 : 1;
    const startRow = piece.color === 'white' ? 6 : 1;
    
    // Moving forward
    if (colDiff === 0) {
      // Single step forward
      if (rowDiff === direction) {
        return this.board.getPiece(to.row, to.col) === null;
      }
      // Double step from starting position
      if (rowDiff === 2 * direction && from.row === startRow) {
        return this.board.getPiece(to.row, to.col) === null &&
               this.board.getPiece(from.row + direction, from.col) === null;
      }
    }
    
    // Capturing diagonally
    if (Math.abs(colDiff) === 1 && rowDiff === direction) {
      const destPiece = this.board.getPiece(to.row, to.col);
      return destPiece !== null && destPiece.color !== piece.color;
    }
    
    return false;
  }

  private isPathClear(from: Position, to: Position): boolean {
    const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;

    let currentRow = from.row + rowStep;
    let currentCol = from.col + colStep;

    while (currentRow !== to.row || currentCol !== to.col) {
      if (this.board.getPiece(currentRow, currentCol) !== null) {
        return false;
      }
      currentRow += rowStep;
      currentCol += colStep;
    }

    return true;
  }
}
