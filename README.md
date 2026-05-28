# Mychess Game

A terminal-based chess game built with **TypeScript** and **Node.js**.

I made this project during the beginning of my second semester while learning TypeScript, terminal input handling, and chess move logic. The game runs completely inside the terminal and supports local two-player gameplay.

## Photos
<img width="473" height="497" alt="Screenshot From 2026-05-28 11-49-36" src="https://github.com/user-attachments/assets/261154b5-3389-4209-8612-c7fbad9f5844" />


## Demo

https://github.com/user-attachments/assets/9d1b7712-ff17-4c69-957d-423f2403c659

## Features

- Colored chess board rendered in the terminal
- Two-player local gameplay
- Legal move highlighting
- Check detection
- Castling support
- En passant support
- Recent move highlighting
- Coordinate-based input like `e2` to `e4`

## Tech Stack

- TypeScript
- Node.js
- Chalk
- Readline

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Run the Game

```bash
npm start
```

The project uses this start command to run the game without Node deprecation warnings:

```bash
NODE_OPTIONS=--no-deprecation tsx chess.ts
```

## How to Play

The game asks for the initial and final position of a piece.

Example:

```text
White turn - Enter initial position :- e2
White turn - Enter final position :- e4
Black turn - Enter initial position :- e7
Black turn - Enter final position :- e5
```

Use normal chess coordinates:

- Columns: `a` to `h`
- Rows: `1` to `8`
- Example moves: `e2` to `e4`, `g1` to `f3`, `f1` to `c4`

## Project Structure

```text
Mychess_game/
├── chess.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## What I Learned

While building this project, I practiced:

- Working with TypeScript arrays and functions
- Handling terminal input using `readline`
- Rendering colored output using `chalk`
- Implementing chess movement rules
- Managing game state manually
- Thinking through edge cases like check, castling, and en passant

## Future Improvements

- Add checkmate and stalemate detection
- Add pawn promotion
- Improve input validation messages
- Refactor the code into smaller files
- Add unit tests for move validation
- Add a simple web UI version

## Author

Made by Navneet Kumar Dubey.
