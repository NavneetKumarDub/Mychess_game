import * as readline from 'readline';
import { ChessBoard } from './board';
import { MoveValidator } from './moveValidator';
import { Renderer } from './renderer';
import { PieceColor, Position } from './types';

export class Game {
  private board: ChessBoard;
  private validator: MoveValidator;
  private renderer: Renderer;
  private currentPlayer: PieceColor;
  private rl: readline.Interface;

  constructor() {
    this.board = new ChessBoard();
    this.validator = new MoveValidator(this.board);
    this.renderer = new Renderer();
    this.currentPlayer = 'white';
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  start(): void {
    this.renderer.renderBoard(this.board);
    this.renderer.displayHelp();
    this.renderer.displayTurn(this.currentPlayer);
    this.promptMove();
  }

  private promptMove(): void {
    this.rl.question('Enter your move: ', (input: string) => {
      this.handleInput(input.trim().toLowerCase());
    });
  }

  private handleInput(input: string): void {
    if (input === 'quit' || input === 'exit') {
      this.renderer.displayMessage('Thanks for playing!', 'info');
      this.rl.close();
      return;
    }

    if (input === 'help') {
      this.renderer.displayHelp();
      this.promptMove();
      return;
    }

    if (!this.isValidMoveFormat(input)) {
      this.renderer.displayMessage('Invalid format! Use format like: e2e4', 'error');
      this.promptMove();
      return;
    }

    const move = this.parseMove(input);
    if (!move) {
      this.renderer.displayMessage('Invalid move coordinates!', 'error');
      this.promptMove();
      return;
    }

    if (!this.validator.isValidMove(move.from, move.to, this.currentPlayer)) {
      this.renderer.displayMessage('Invalid move! Please try again.', 'error');
      this.promptMove();
      return;
    }

    // Execute the move
    this.board.movePiece(move.from.row, move.from.col, move.to.row, move.to.col);
    
    // Switch player
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    
    // Render the updated board
    this.renderer.renderBoard(this.board);
    
    // Check if the current player is in check
    if (this.board.isInCheck(this.currentPlayer)) {
      this.renderer.displayCheckMessage(this.currentPlayer);
    }
    
    this.renderer.displayTurn(this.currentPlayer);
    this.promptMove();
  }

  private isValidMoveFormat(input: string): boolean {
    // Expected format: e2e4 or e2 e4
    const regex = /^[a-h][1-8]\s*[a-h][1-8]$/;
    return regex.test(input);
  }

  private parseMove(input: string): { from: Position; to: Position } | null {
    // Remove spaces
    input = input.replace(/\s+/g, '');
    
    if (input.length !== 4) return null;
    
    const fromCol = input.charCodeAt(0) - 'a'.charCodeAt(0);
    const fromRow = 8 - parseInt(input[1]);
    const toCol = input.charCodeAt(2) - 'a'.charCodeAt(0);
    const toRow = 8 - parseInt(input[3]);
    
    if (fromCol < 0 || fromCol >= 8 || fromRow < 0 || fromRow >= 8 ||
        toCol < 0 || toCol >= 8 || toRow < 0 || toRow >= 8) {
      return null;
    }
    
    return {
      from: { row: fromRow, col: fromCol },
      to: { row: toRow, col: toCol }
    };
  }
}
