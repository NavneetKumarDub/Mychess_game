# Mychess_game

A CLI-based chess game built with TypeScript and colored with the chalk module. This is a fully functional chess game that runs in the terminal with beautiful colored graphics.

## Features

- 🎨 Colorful CLI interface using chalk for text coloring
- ♟️ Full chess piece movement validation
- 🏁 Turn-based gameplay for two players
- ✅ Check detection
- 📋 Intuitive move notation (e.g., e2e4)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/NavneetKumarDub/Mychess_game.git
cd Mychess_game
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

Run the game:
```bash
npm start
```

Or build and run in one command:
```bash
npm run dev
```

## How to Play

- Enter moves in algebraic notation: `e2e4` (moves piece from e2 to e4)
- Type `help` to see instructions
- Type `quit` or `exit` to leave the game
- White pieces are displayed in white, black pieces in black
- The board uses a checkerboard pattern with white and blue squares
- Selected squares are highlighted in green

## Game Controls

- **Move format**: `[from][to]` (e.g., `e2e4`, `g1f3`)
  - First two characters: source square (column + row)
  - Last two characters: destination square (column + row)
- **Columns**: a-h (left to right)
- **Rows**: 1-8 (bottom to top from white's perspective)

## Technical Details

- **Language**: TypeScript
- **Graphics**: CLI-based with chalk for colored text
- **Architecture**:
  - Board representation with piece management
  - Move validation system
  - Renderer for CLI graphics
  - Game loop with turn management
  - Check detection

## Project Structure

```
src/
├── index.ts          # Entry point
├── game.ts           # Game loop and input handling
├── board.ts          # Chess board representation
├── moveValidator.ts  # Move validation logic
├── renderer.ts       # CLI rendering with chalk
└── types.ts          # TypeScript type definitions
```

## License

MIT