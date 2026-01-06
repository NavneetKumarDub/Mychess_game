import chalk from 'chalk';
import { ChessBoard } from './board';
import { Piece } from './types';

export class Renderer {
  private getPieceSymbol(piece: Piece | null): string {
    if (!piece) return ' ';
    
    const symbols = {
      'king': '♔',
      'queen': '♕',
      'rook': '♖',
      'bishop': '♗',
      'knight': '♘',
      'pawn': '♙'
    };
    
    return symbols[piece.type];
  }

  renderBoard(board: ChessBoard, selectedPos?: { row: number; col: number }): void {
    console.clear();
    console.log(chalk.bold.cyan('\n  ===== CHESS GAME =====\n'));
    
    // Column labels
    console.log('     ' + ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(l => chalk.bold.yellow(l)).join('   '));
    console.log('   ' + chalk.gray('┌───┬───┬───┬───┬───┬───┬───┬───┐'));
    
    for (let row = 0; row < 8; row++) {
      let rowStr = ' ' + chalk.bold.yellow((8 - row).toString()) + ' ' + chalk.gray('│');
      
      for (let col = 0; col < 8; col++) {
        const piece = board.getPiece(row, col);
        const symbol = this.getPieceSymbol(piece);
        
        // Determine background color (checkerboard pattern)
        const isLightSquare = (row + col) % 2 === 0;
        const isSelected = selectedPos && selectedPos.row === row && selectedPos.col === col;
        
        let coloredSymbol: string;
        if (piece) {
          if (piece.color === 'white') {
            coloredSymbol = chalk.white.bold(symbol);
          } else {
            coloredSymbol = chalk.gray.bold(symbol);
          }
        } else {
          coloredSymbol = ' ';
        }
        
        // Apply background color
        if (isSelected) {
          coloredSymbol = chalk.bgGreen(` ${coloredSymbol} `);
        } else if (isLightSquare) {
          coloredSymbol = chalk.bgWhite(` ${coloredSymbol} `);
        } else {
          coloredSymbol = chalk.bgBlue(` ${coloredSymbol} `);
        }
        
        rowStr += coloredSymbol + chalk.gray('│');
      }
      
      rowStr += ' ' + chalk.bold.yellow((8 - row).toString());
      console.log(rowStr);
      
      if (row < 7) {
        console.log('   ' + chalk.gray('├───┼───┼───┼───┼───┼───┼───┼───┤'));
      }
    }
    
    console.log('   ' + chalk.gray('└───┴───┴───┴───┴───┴───┴───┴───┘'));
    console.log('     ' + ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(l => chalk.bold.yellow(l)).join('   '));
    console.log();
  }

  displayMessage(message: string, type: 'info' | 'error' | 'success' = 'info'): void {
    switch (type) {
      case 'error':
        console.log(chalk.red('❌ ' + message));
        break;
      case 'success':
        console.log(chalk.green('✓ ' + message));
        break;
      default:
        console.log(chalk.blue('ℹ ' + message));
    }
  }

  displayTurn(color: 'white' | 'black'): void {
    const coloredTurn = color === 'white' ? chalk.white.bold('WHITE') : chalk.gray.bold('BLACK');
    console.log(chalk.cyan(`\n${coloredTurn}'s turn\n`));
  }

  displayHelp(): void {
    console.log(chalk.yellow('\nHow to play:'));
    console.log('  • Enter moves in format: e2e4 (from e2 to e4)');
    console.log('  • Type "help" to see this message');
    console.log('  • Type "quit" to exit the game');
    console.log();
  }

  displayCheckMessage(color: 'white' | 'black'): void {
    console.log(chalk.red.bold(`\n⚠️  ${color.toUpperCase()} is in CHECK! ⚠️\n`));
  }

  displayCheckmateMessage(color: 'white' | 'black'): void {
    const winner = color === 'white' ? 'BLACK' : 'WHITE';
    console.log(chalk.red.bold(`\n🏆 CHECKMATE! ${winner} WINS! 🏆\n`));
  }
}
