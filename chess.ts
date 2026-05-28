//colour box//////////////////////////////////////////////////////
import chalk from "chalk";
import type { ChalkInstance } from "chalk";
const black = chalk.bold.bgRgb(118, 150, 86),
  white = chalk.bold.bgRgb(238, 238, 210),
  blackp = chalk.bold.bgRgb(87, 83, 82),
  whitep = chalk.bold.bgRgb(248, 248, 248),
  yg = chalk.bold.bgRgb(187, 203, 68), //recent move
  yw = chalk.bold.bgRgb(248, 247, 129), //recent move
  mcw = chalk.bold.bgRgb(189, 190, 166), //moves colour in white
  mcb = chalk.bold.bgRgb(94, 120, 69), //moves colour in black
  sbw = chalk.bold.bgRgb(251, 251, 90), //selected box in white
  sbb = chalk.bold.bgRgb(221, 229, 59), //selected box in black
  red = chalk.bold.bgRgb(233, 81, 30); //red check

//input work////////////////////////////////////////////////////////

import * as readline from "readline";

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const q = async (value: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    r1.question(value, resolve);
  });
};

//board//////////////////////////////////////////////////////////////

let board: string[][] = [
  ["BR ", "BN ", "BB ", "BQ ", "BK ", "BB ", "BN ", "BR "],
  ["BP ", "BP ", "BP ", "BP ", "BP ", "BP ", "BP ", "BP "],
  ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
  ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
  ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
  ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
  ["WP ", "WP ", "WP ", "WP ", "WP ", "WP ", "WP ", "WP "],
  ["WR ", "WN ", "WB ", "WQ ", "WK ", "WB ", "WN ", "WR "],
];

let colour1: ChalkInstance,
  colour2: ChalkInstance,
  colour3: ChalkInstance,
  colour4: ChalkInstance,
  colour5: ChalkInstance,
  colour6: ChalkInstance,
  colour7: ChalkInstance,
  colour0: ChalkInstance,
  bg0: ChalkInstance,
  bg1: ChalkInstance,
  bg2: ChalkInstance,
  bg3: ChalkInstance,
  bg4: ChalkInstance,
  bg5: ChalkInstance,
  bg6: ChalkInstance,
  bg7: ChalkInstance;

// console.table(board);

//printing board function/////////////////////////////////////////////
async function clearall(printboard: string[][]) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      printboard[i][j] = printboard[i][j].slice(0, 2);
    }
  }
}
let a = 100,
  b = 100,
  c = 100,
  d = 100,
  e = 100,
  f = 100,
  g = 100,
  h = 100,
  l = 100,
  k = 100,
  count = 0;

function getking(): string {
  for (let q = 0; q < 8; q++) {
    for (let w = 0; w < 8; w++) {
      if (board[q][w].slice(1, 3) == "K@") {
        let temp1: string = q.toString();
        let temp2 = w.toString();
        return temp1 + temp2;
      }
    }
  }
  return "99";
}
async function print(check: number) {
  let turn: string;
  if (count % 2 == 0) turn = "B";
  else turn = "W";
  let value12 = scan(turn, false);
  if (value12 == false) console.log(red("  CHECK  "));
  clear("#", true);
  clear("-", true);
  let position = getking();
  let im = parseInt(position[0]);
  let jm = parseInt(position[1]);
  let printboard = board.map((row) => [...row]);
  clearall(printboard);
  // console.table(board);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 3; j++) {
      let r = "",
        rx0 = "",
        rx1 = "",
        rx2 = "",
        rx3 = "",
        rx4 = "",
        rx5 = "",
        rx6 = "",
        rx7 = "",
        rsp = "";

      if (i % 2 == 0) {
        if (j == 0 || j == 2) {
          colour0 = colour2 = colour4 = colour6 = white;
          colour1 = colour3 = colour5 = colour7 = black;
          //
          if (i == a && check == 1) {
            if (b == 0) colour0 = sbw;
            if (b == 2) colour2 = sbw;
            if (b == 4) colour4 = sbw;
            if (b == 6) colour6 = sbw;

            if (b == 1) colour1 = sbb;
            if (b == 3) colour3 = sbb;
            if (b == 5) colour5 = sbb;
            if (b == 7) colour7 = sbb;
          }
          // console.log(e, f, k, l);
          // console.log(c, d, g, h);
          if (count % 2 == 0 && e != 100 && f != 100 && k != 100 && l != 100) {
            if (i == e) {
              if (f == 0) colour0 = yw;
              if (f == 2) colour2 = yw;
              if (f == 4) colour4 = yw;
              if (f == 6) colour6 = yw;

              if (f == 1) colour1 = yg;
              if (f == 3) colour3 = yg;
              if (f == 5) colour5 = yg;
              if (f == 7) colour7 = yg;
            }
            if (k == i) {
              if (l == 0) colour0 = yw;
              if (l == 2) colour2 = yw;
              if (l == 4) colour4 = yw;
              if (l == 6) colour6 = yw;

              if (l == 1) colour1 = yg;
              if (l == 3) colour3 = yg;
              if (l == 5) colour5 = yg;
              if (l == 7) colour7 = yg;
            }
          } else if (
            count % 2 != 0 &&
            c != 100 &&
            d != 100 &&
            g != 100 &&
            h != 100
          ) {
            if (c == i) {
              if (d == 0) colour0 = yw;
              if (d == 2) colour2 = yw;
              if (d == 4) colour4 = yw;
              if (d == 6) colour6 = yw;

              if (d == 1) colour1 = yg;
              if (d == 3) colour3 = yg;
              if (d == 5) colour5 = yg;
              if (d == 7) colour7 = yg;
            }
            if (g == i) {
              if (h == 0) colour0 = yw;
              if (h == 2) colour2 = yw;
              if (h == 4) colour4 = yw;
              if (h == 6) colour6 = yw;

              if (h == 1) colour1 = yg;
              if (h == 3) colour3 = yg;
              if (h == 5) colour5 = yg;
              if (h == 7) colour7 = yg;
            }
          }

          if (position != "99") {
            if (im == i) {
              if (position[1] == "0") colour0 = red;
              if (position[1] == "1") colour1 = red;
              if (position[1] == "2") colour2 = red;
              if (position[1] == "3") colour3 = red;
              if (position[1] == "4") colour4 = red;
              if (position[1] == "5") colour5 = red;
              if (position[1] == "6") colour6 = red;
              if (position[1] == "7") colour7 = red;
            }
          }

          rx0 = colour0("      "); //white
          rx2 = colour2("      ");
          rx4 = colour4("      ");
          rx6 = colour6("      ");

          rx1 = colour1("      "); //black
          rx3 = colour3("      ");
          rx5 = colour5("      ");
          rx7 = colour7("      ");
        } else if (j == 1) {
          bg0 = bg2 = bg4 = bg6 = colour0 = colour2 = colour4 = colour6 = white;
          bg1 = bg3 = bg5 = bg7 = colour1 = colour3 = colour5 = colour7 = black;

          if (board[i][0][2] == "*" || board[i][0][2] == "+") {
            bg0 = white;
          }
          if (board[i][2][2] == "*" || board[i][2][2] == "+") {
            bg2 = white;
          }
          if (board[i][4][2] == "*" || board[i][4][2] == "+") {
            bg4 = white;
          }
          if (board[i][6][2] == "*" || board[i][6][2] == "+") {
            bg6 = white;
          }

          if (board[i][1][2] == "*" || board[i][1][2] == "+") {
            bg1 = black;
          }
          if (board[i][3][2] == "*" || board[i][3][2] == "+") {
            bg3 = black;
          }
          if (board[i][5][2] == "*" || board[i][5][2] == "+") {
            bg5 = black;
          }
          if (board[i][7][2] == "*" || board[i][7][2] == "+") {
            bg7 = black;
          }
          //
          // console.log(e, f, k, l);
          // console.log(c, d, g, h);

          if (count % 2 == 0 && e != 100 && f != 100 && k != 100 && l != 100) {
            if (e == i) {
              if (f == 0) colour0 = bg0 = yw;
              if (f == 2) colour2 = bg2 = yw;
              if (f == 4) colour4 = bg4 = yw;
              if (f == 6) colour6 = bg6 = yw;

              if (f == 1) colour1 = bg1 = yg;
              if (f == 3) colour3 = bg3 = yg;
              if (f == 5) colour5 = bg5 = yg;
              if (f == 7) colour7 = bg7 = yg;
            }
            if (k == i) {
              if (l == 0) colour0 = bg0 = yw;
              if (l == 2) colour2 = bg2 = yw;
              if (l == 4) colour4 = bg4 = yw;
              if (l == 6) colour6 = bg6 = yw;

              if (l == 1) colour1 = bg1 = yg;
              if (l == 3) colour3 = bg3 = yg;
              if (l == 5) colour5 = bg5 = yg;
              if (l == 7) colour7 = bg7 = yg;
            }
          } else if (
            count % 2 != 0 &&
            c != 100 &&
            d != 100 &&
            g != 100 &&
            h != 100
          ) {
            if (c == i) {
              if (d == 0) colour0 = bg0 = yw;
              if (d == 2) colour2 = bg2 = yw;
              if (d == 4) colour4 = bg4 = yw;
              if (d == 6) colour6 = bg6 = yw;

              if (d == 1) colour1 = bg1 = yg;
              if (d == 3) colour3 = bg3 = yg;
              if (d == 5) colour5 = bg5 = yg;
              if (d == 7) colour7 = bg7 = yg;
            }
            if (g == i) {
              if (h == 0) colour0 = bg0 = yw;
              if (h == 2) colour2 = bg2 = yw;
              if (h == 4) colour4 = bg4 = yw;
              if (h == 6) colour6 = bg6 = yw;

              if (h == 1) colour1 = bg1 = yg;
              if (h == 3) colour3 = bg3 = yg;
              if (h == 5) colour5 = bg5 = yg;
              if (h == 7) colour7 = bg7 = yg;
            }
          }

          if (board[i][0][2] == "*" || board[i][0][2] == "+") {
            colour0 = mcw;
          }
          if (board[i][2][2] == "*" || board[i][2][2] == "+") {
            colour2 = mcw;
          }
          if (board[i][4][2] == "*" || board[i][4][2] == "+") {
            colour4 = mcw;
          }
          if (board[i][6][2] == "*" || board[i][6][2] == "+") {
            colour6 = mcw;
          }

          if (board[i][1][2] == "*" || board[i][1][2] == "+") {
            colour1 = mcb;
          }
          if (board[i][3][2] == "*" || board[i][3][2] == "+") {
            colour3 = mcb;
          }
          if (board[i][5][2] == "*" || board[i][5][2] == "+") {
            colour5 = mcb;
          }
          if (board[i][7][2] == "*" || board[i][7][2] == "+") {
            colour7 = mcb;
          }
          ////selected move//
          if (check == 1 && i == a) {
            if (b == 0) {
              bg0 = colour0 = sbw;
            }
            if (b == 2) {
              bg2 = colour2 = sbw;
            }
            if (b == 4) {
              bg4 = colour4 = sbw;
            }
            if (b == 6) {
              bg6 = colour6 = sbw;
            }
          }
          if (check == 1 && i == a) {
            if (b == 1) {
              bg1 = colour1 = sbb;
            }
            if (b == 3) {
              bg3 = colour3 = sbb;
            }
            if (b == 5) {
              bg5 = colour5 = sbb;
            }
            if (b == 7) {
              bg7 = colour7 = sbb;
            }
          }
          if (position != "99") {
            if (im == i) {
              if (position[1] == "0") colour0 = bg0 = red;
              if (position[1] == "1") colour1 = bg1 = red;
              if (position[1] == "2") colour2 = bg2 = red;
              if (position[1] == "3") colour3 = bg3 = red;
              if (position[1] == "4") colour4 = bg4 = red;
              if (position[1] == "5") colour5 = bg5 = red;
              if (position[1] == "6") colour6 = bg6 = red;
              if (position[1] == "7") colour7 = bg7 = red;
            }
          }
          rx0 = bg0("  ") + colour0(printboard[i][0]) + bg0("  ");
          rx2 = bg2("  ") + colour2(printboard[i][2]) + bg2("  ");
          rx4 = bg4("  ") + colour4(printboard[i][4]) + bg4("  ");
          rx6 = bg6("  ") + colour6(printboard[i][6]) + bg6("  ");
          rx1 = bg1("  ") + colour1(printboard[i][1]) + bg1("  ");
          rx3 = bg3("  ") + colour3(printboard[i][3]) + bg3("  ");
          rx5 = bg5("  ") + colour5(printboard[i][5]) + bg5("  ");
          rx7 = bg7("  ") + colour7(printboard[i][7]) + bg7("  ");
        }
      } else {
        if (j == 0 || j == 2) {
          colour0 = colour2 = colour4 = colour6 = black;
          colour1 = colour3 = colour5 = colour7 = white;

          if (i == a && check == 1) {
            if (b == 0) colour0 = sbb;
            if (b == 2) colour2 = sbb;
            if (b == 4) colour4 = sbb;
            if (b == 6) colour6 = sbb;

            if (b == 1) colour1 = sbw;
            if (b == 3) colour3 = sbw;
            if (b == 5) colour5 = sbw;
            if (b == 7) colour7 = sbw;
          }
          // console.log(e, f, k, l);
          // console.log(c, d, g, h);
          if (count % 2 == 0 && e != 100 && f != 100 && k != 100 && l != 100) {
            if (e == i) {
              if (f == 0) colour0 = yg;
              if (f == 2) colour2 = yg;
              if (f == 4) colour4 = yg;
              if (f == 6) colour6 = yg;

              if (f == 1) colour1 = yw;
              if (f == 3) colour3 = yw;
              if (f == 5) colour5 = yw;
              if (f == 7) colour7 = yw;
            }
            if (k == i) {
              if (l == 0) colour0 = yg;
              if (l == 2) colour2 = yg;
              if (l == 4) colour4 = yg;
              if (l == 6) colour6 = yg;

              if (l == 1) colour1 = yw;
              if (l == 3) colour3 = yw;
              if (l == 5) colour5 = yw;
              if (l == 7) colour7 = yw;
            }
          } else if (
            count % 2 != 0 &&
            c != 100 &&
            d != 100 &&
            g != 100 &&
            h != 100
          ) {
            if (c == i) {
              if (d == 0) colour0 = yg;
              if (d == 2) colour2 = yg;
              if (d == 4) colour4 = yg;
              if (d == 6) colour6 = yg;

              if (d == 1) colour1 = yw;
              if (d == 3) colour3 = yw;
              if (d == 5) colour5 = yw;
              if (d == 7) colour7 = yw;
            }
            if (g == i) {
              if (h == 0) colour0 = yg;
              if (h == 2) colour2 = yg;
              if (h == 4) colour4 = yg;
              if (h == 6) colour6 = yg;

              if (h == 1) colour1 = yw;
              if (h == 3) colour3 = yw;
              if (h == 5) colour5 = yw;
              if (h == 7) colour7 = yw;
            }
          }
          if (position != "99") {
            if (im == i) {
              if (position[1] == "0") colour0 = red;
              if (position[1] == "1") colour1 = red;
              if (position[1] == "2") colour2 = red;
              if (position[1] == "3") colour3 = red;
              if (position[1] == "4") colour4 = red;
              if (position[1] == "5") colour5 = red;
              if (position[1] == "6") colour6 = red;
              if (position[1] == "7") colour7 = red;
            }
          }
          rx0 = colour0("      "); //black
          rx2 = colour2("      ");
          rx4 = colour4("      ");
          rx6 = colour6("      ");

          rx1 = colour1("      "); //white
          rx3 = colour3("      ");
          rx5 = colour5("      ");
          rx7 = colour7("      ");
        } else if (j == 1) {
          bg0 = bg2 = bg4 = bg6 = colour0 = colour2 = colour4 = colour6 = black;
          bg1 = bg3 = bg5 = bg7 = colour1 = colour3 = colour5 = colour7 = white;

          if (board[i][0][2] == "*" || board[i][0][2] == "+") {
            bg0 = black;
          }
          if (board[i][2][2] == "*" || board[i][2][2] == "+") {
            bg2 = black;
          }
          if (board[i][4][2] == "*" || board[i][4][2] == "+") {
            bg4 = black;
          }
          if (board[i][6][2] == "*" || board[i][6][2] == "+") {
            bg6 = black;
          }
          if (board[i][1][2] == "*" || board[i][1][2] == "+") {
            bg1 = white;
          }
          if (board[i][3][2] == "*" || board[i][3][2] == "+") {
            bg3 = white;
          }
          if (board[i][5][2] == "*" || board[i][5][2] == "+") {
            bg5 = white;
          }
          if (board[i][7][2] == "*" || board[i][7][2] == "+") {
            bg7 = white;
          }
          // console.log(e, f, k, l);
          // console.log(c, d, g, h);
          if (count % 2 == 0 && e != 100 && f != 100 && k != 100 && l != 100) {
            if (e == i) {
              if (f == 0) colour0 = bg0 = yg;
              if (f == 2) colour2 = bg2 = yg;
              if (f == 4) colour4 = bg4 = yg;
              if (f == 6) colour6 = bg6 = yg;

              if (f == 1) colour1 = bg1 = yw;
              if (f == 3) colour3 = bg3 = yw;
              if (f == 5) colour5 = bg5 = yw;
              if (f == 7) colour7 = bg7 = yw;
            }
            if (k == i) {
              if (l == 0) colour0 = bg0 = yg;
              if (l == 2) colour2 = bg2 = yg;
              if (l == 4) colour4 = bg4 = yg;
              if (l == 6) colour6 = bg6 = yg;

              if (l == 1) colour1 = bg1 = yw;
              if (l == 3) colour3 = bg3 = yw;
              if (l == 5) colour5 = bg5 = yw;
              if (l == 7) colour7 = bg7 = yw;
            }
          } else if (
            count % 2 != 0 &&
            c != 100 &&
            d != 100 &&
            g != 100 &&
            h != 100
          ) {
            if (c == i) {
              if (d == 0) colour0 = bg0 = yg;
              if (d == 2) colour2 = bg2 = yg;
              if (d == 4) colour4 = bg4 = yg;
              if (d == 6) colour6 = bg6 = yg;

              if (d == 1) colour1 = bg1 = yw;
              if (d == 3) colour3 = bg3 = yw;
              if (d == 5) colour5 = bg5 = yw;
              if (d == 7) colour7 = bg7 = yw;
            }
            if (g == i) {
              if (h == 0) colour0 = bg0 = yg;
              if (h == 2) colour2 = bg2 = yg;
              if (h == 4) colour4 = bg4 = yg;
              if (h == 6) colour6 = bg6 = yg;

              if (h == 1) colour1 = bg1 = yw;
              if (h == 3) colour3 = bg3 = yw;
              if (h == 5) colour5 = bg5 = yw;
              if (h == 7) colour7 = bg7 = yw;
            }
          }
          if (board[i][0][2] == "*" || board[i][0][2] == "+") {
            colour0 = mcb;
          }
          if (board[i][2][2] == "*" || board[i][2][2] == "+") {
            colour2 = mcb;
          }
          if (board[i][4][2] == "*" || board[i][4][2] == "+") {
            colour4 = mcb;
          }
          if (board[i][6][2] == "*" || board[i][6][2] == "+") {
            colour6 = mcb;
          }
          if (board[i][1][2] == "*" || board[i][1][2] == "+") {
            colour1 = mcw;
          }
          if (board[i][3][2] == "*" || board[i][3][2] == "+") {
            colour3 = mcw;
          }
          if (board[i][5][2] == "*" || board[i][5][2] == "+") {
            colour5 = mcw;
          }
          if (board[i][7][2] == "*" || board[i][7][2] == "+") {
            colour7 = mcw;
          }
          if (check == 1 && i == a) {
            if (b == 0) {
              bg0 = colour0 = sbb;
            }
            if (b == 2) {
              bg2 = colour2 = sbb;
            }
            if (b == 4) {
              bg4 = colour4 = sbb;
            }
            if (b == 6) {
              bg6 = colour6 = sbb;
            }
          }
          if (check == 1 && i == a) {
            if (b == 1) {
              bg1 = colour1 = sbw;
            }
            if (b == 3) {
              bg3 = colour3 = sbw;
            }
            if (b == 5) {
              bg5 = colour5 = sbw;
            }
            if (b == 7) {
              bg7 = colour7 = sbw;
            }
          }
          if (position != "99") {
            if (im == i) {
              if (position[1] == "0") colour0 = bg0 = red;
              if (position[1] == "1") colour1 = bg1 = red;
              if (position[1] == "2") colour2 = bg2 = red;
              if (position[1] == "3") colour3 = bg3 = red;
              if (position[1] == "4") colour4 = bg4 = red;
              if (position[1] == "5") colour5 = bg5 = red;
              if (position[1] == "6") colour6 = bg6 = red;
              if (position[1] == "7") colour7 = bg7 = red;
            }
          }

          rx0 = bg0("  ") + colour0(printboard[i][0]) + bg0("  ");
          rx2 = bg2("  ") + colour2(printboard[i][2]) + bg2("  ");
          rx4 = bg4("  ") + colour4(printboard[i][4]) + bg4("  ");
          rx6 = bg6("  ") + colour6(printboard[i][6]) + bg6("  ");
          rx1 = bg1("  ") + colour1(printboard[i][1]) + bg1("  ");
          rx3 = bg3("  ") + colour3(printboard[i][3]) + bg3("  ");
          rx5 = bg5("  ") + colour5(printboard[i][5]) + bg5("  ");
          rx7 = bg7("  ") + colour7(printboard[i][7]) + bg7("  ");
        }
      }

      if (j == 0 || j == 2) rsp = "  ";
      else if (j == 1) rsp = (8 - i).toString() + " ";

      r = rsp + rx0 + rx1 + rx2 + rx3 + rx4 + rx5 + rx6 + rx7;
      console.log(r);
    }
  }
  console.log("     a     b     c     d     e     f     g     h   \n");
}
async function possmove(char: string, ask: boolean) {
  //char same colour as king
  let x: number = 0,
    y: number = 0,
    char2: string = "";
  if (char == "W") {
    x = -1;
    y = 6;
    char2 = "B";
  } else if (char == "B") {
    x = 1;
    y = 1;
    char2 = "W";
  }
  let pawn1 = char + "P",
    rook1 = char + "R",
    bishop1 = char + "B",
    queen1 = char + "Q",
    knight1 = char + "N",
    king1 = char + "K";

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].slice(0, 2) == pawn1) {
        pawnmove(i, j, x, y, char2, char);
      } else if (board[i][j].slice(0, 2) == rook1) rookmove(i, j, char, char2);
      else if (board[i][j].slice(0, 2) == bishop1)
        bishopmove(i, j, char, char2, ask);
      else if (board[i][j].slice(0, 2) == king1) {
        kingmove(i, j, char);
        clear("!", true);
      } else if (board[i][j].slice(0, 2) == knight1) knightmove(i, j, char);
      else if (board[i][j].slice(0, 2) == queen1) {
        rookmove(i, j, char, char2);
        bishopmove(i, j, char, char2, ask);
      }
    }
  }
}

// check number of available moves
function checkmove(char: string): boolean {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j][2] == char) return true;
    }
  }
  return false;
}
function scan(char: string, ask: boolean): boolean {
  clear("@", ask);
  possmove(char, true);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j][1] == "K" && board[i][j][0] != char) {
        if (board[i][j][2] == "@") {
          if (ask) clear("@", ask);
          return false;
        }
      }
    }
  }

  return true;
}
function clear(char: string, ask: boolean): void {
  if (ask == true) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j][2] == char) {
          board[i][j] = board[i][j].slice(0, 2) + " ";
        }
      }
    }
  }
}

let blc = true,
  brc = true,
  bc = true,
  wlc = true,
  wrc = true,
  wc = true;
async function start() {
  let ip: string, fp: string;
  count = 0;

  while (true) {
    print(0);

    let i, j, m, n;

    //white move/////////////////////////////////////////////
    if (count % 2 == 0) {
      ip = await q("White turn - Enter inital position :- ");
      if (!isNaN(Number(ip[1])) == false) {
        continue;
      }
      j = ip[0].charCodeAt(0) - 97;
      i = 8 - parseInt(ip[1]);

      if (i > 7 || i < 0 || j > 7 || j < 0) continue;

      if (board[i][j].slice(0, 2) == "WP") pawn(i, j, -1, 6, "B", "W");
      else if (board[i][j].slice(0, 2) == "WB") bishop(i, j, "W", "B");
      else if (board[i][j].slice(0, 2) == "WR") rook(i, j, "W", "B");
      else if (board[i][j].slice(0, 2) == "WN") knight(i, j, "W");
      else if (board[i][j].slice(0, 2) == "WK") {
        possmove("B", false);
        king(i, j, "W");
      } else if (board[i][j].slice(0, 2) == "WQ") {
        rook(i, j, "W", "B");
        bishop(i, j, "W", "B");
      } else {
        clear("+", true);
        clear("*", true);
        clear("-", true);
        clear("#", true);
        continue;
      }
      a = c = i;
      b = d = j;

      print(1);
      clear("@", true);

      if (board[i][j][1] == "K") {
        let check3 = checkmove("+");
        if (check3 == false) {
          // clear("@", true);
          clear("*", true);
          clear("+", true);
          clear("-", true);
          clear("#", true);
          continue;
        }
      } else {
        let check3 = checkmove("*");
        if (check3 == false) {
          // clear("@", true);
          clear("+", true);
          clear("*", true);
          clear("-", true);
          clear("#", true);
          continue;
        }
      }
      fp = await q("White turn - Enter final position :- ");
      if (!isNaN(Number(fp[1])) == false) {
        continue;
      }
      n = fp[0].charCodeAt(0) - 97;
      m = 8 - parseInt(fp[1]);

      if (m > 7 || m < 0 || n > 7 || n < 0) {
        // clear("@", true);
        clear("+", true);
        clear("*", true);
        clear("-", true);
        clear("#", true);
        continue;
      }
      g = m;
      h = n;
      clear("@", true);
    }
    //black move//////////////////////////////////////////////
    else {
      ip = await q("Black turn - Enter inital position :- ");
      if (!isNaN(Number(ip[1])) == false) {
        continue;
      }
      j = ip[0].charCodeAt(0) - 97;
      i = 8 - parseInt(ip[1]);
      if (i > 7 || i < 0 || j > 7 || j < 0) continue;
      if (board[i][j].slice(0, 2) == "BP") pawn(i, j, 1, 1, "W", "B");
      else if (board[i][j].slice(0, 2) == "BB") bishop(i, j, "B", "W");
      else if (board[i][j].slice(0, 2) == "BR") rook(i, j, "B", "W");
      else if (board[i][j].slice(0, 2) == "BN") knight(i, j, "B");
      else if (board[i][j].slice(0, 2) == "BK") {
        possmove("W", false);
        king(i, j, "B");
      } else if (board[i][j].slice(0, 2) == "BQ") {
        rook(i, j, "B", "W");
        bishop(i, j, "B", "W");
      } else {
        clear("@", true);
        clear("+", true);
        clear("*", true);
        clear("-", true);
        clear("#", true);
        continue;
      }
      a = e = i;
      b = f = j;
      print(1);
      clear("@", true);

      if (board[i][j][1] == "K") {
        let check3 = checkmove("+");
        if (check3 == false) {
          clear("@", true);
          clear("*", true);
          clear("+", true);
          clear("-", true);
          clear("#", true);
          continue;
        }
      } else {
        let check3 = checkmove("*");
        if (check3 == false) {
          clear("@", true);
          clear("+", true);
          clear("*", true);
          clear("-", true);
          clear("#", true);
          continue;
        }
      }
      fp = await q("Black turn - Enter final position :- ");
      if (!isNaN(Number(fp[1])) == false) {
        continue;
      }
      n = fp[0].charCodeAt(0) - 97;
      m = 8 - parseInt(fp[1]);
      //console.log(m, n);
      if (m > 7 || m < 0 || n > 7 || n < 0) {
        clear("@", true);
        clear("+", true);
        clear("*", true);
        clear("-", true);
        clear("#", true);
        continue;
      }
      k = m;
      l = n;
      clear("@", true);
    }

    //position change//////////////////////////////////////////
    if (board[i][j][1] == "K") {
      if (
        board[i][n][2] == "+" &&
        board[i][n - 1][2] == "+" &&
        board[m][n] == board[i][n]
      ) {
        [board[m][n], board[i][j]] = [board[i][j], board[m][n]];
        [board[m][n + 1], board[i][j + 1]] = [board[i][j + 1], board[m][n + 1]];
        clear("@", true);
        clear("*", true);
        clear("+", true);
        clear("-", true);
        clear("#", true);
      } else if (
        board[i][n][2] == "+" &&
        board[i][n + 1][2] == "+" &&
        board[m][n] == board[i][n]
      ) {
        [board[m][n], board[i][j]] = [board[i][j], board[m][n]];
        [board[m][0], board[i][j - 1]] = [board[i][j - 1], board[m][0]];
        clear("@", true);
        clear("*", true);
        clear("+", true);
        clear("-", true);
        clear("#", true);
      } else if (board[m][n][2] == "+") {
        if (board[m][n][0] != " ") {
          board[m][n] = board[i][j];
          board[i][j] = "   ";
          clear("+", true);
          clear("-", true);
          clear("#", true);
          clear("+", true);
          clear("@", true);
        } else {
          [board[m][n], board[i][j]] = [board[i][j], board[m][n]];
          clear("+", true);
          clear("-", true);
          clear("#", true);
          clear("+", true);
          clear("@", true);
        }
      } else {
        clear("@", true);
        clear("+", true);
        clear("*", true);
        clear("-", true);
        clear("#", true);
        clear("=", true);
        continue;
      }
      clear("=", true);
    } else if (board[m][n][2] == "*") {
      if (board[m][n][0] != " ") {
        board[m][n] = board[i][j];
        board[i][j] = "   ";
        clear("*", true);
        clear("-", true);
      } else {
        if (board[m][n][0] == " " && n != j && board[i][j][1] == "P") {
          let u;
          if (count % 2 == 0) u = 1;
          else u = -1;

          board[m + u][n] = "   ";
        }
        clear("*", true);
        clear("-", true);
        [board[m][n], board[i][j]] = [board[i][j], board[m][n]];
      }
      clear("=", true);
    } else {
      clear("@", true);
      clear("+", true);
      clear("*", true);
      clear("-", true);
      clear("#", true);

      continue;
    }
    if (board[m][n][1] == "P") {
      if (board[m - 1][n][2] == "=") board[m - 1][n] = "   ";
      if (board[m + 1][n][2] == "=") board[m + 1][n] = "   ";
      clear("=", true);
    }
    //console.log(i - m);
    if (board[m][n][1] == "P" && (i - m == 2 || m - i == 2)) {
      board[m][n] = board[m][n].slice(0, 2) + "=";
    }

    if (board[7][7].slice(0, 2) != "WR") {
      //white right castle stop
      wrc = false;
    }
    if (board[7][0].slice(0, 2) != "WR") {
      //white left castle stop
      wlc = false;
    }
    if (board[0][0].slice(0, 2) != "BR") {
      //black left castle stop
      blc = false;
    }
    if (board[0][7].slice(0, 2) != "BR") {
      //black right castle stop
      brc = false;
    }
    if (board[0][4].slice(0, 2) != "BK") {
      //black castle stop
      bc = false;
    }
    if (board[7][4].slice(0, 2) != "WK") {
      //white castle stop
      wc = false;
    }
    count++; //change the turn //////////////////////////////
  }
}

start();

async function pawn(
  i: number,
  j: number,
  x: number,
  y: number,
  char1: string, //opp
  char2: string //same
) {
  if (j > 0) {
    if (board[i + x][j - 1][0] == char1) {
      let temp = board[i + x][j - 1];
      board[i + x][j - 1] = board[i][j];
      board[i][j] = "   ";
      let scancheck = scan(char1, true);
      board[i][j] = board[i + x][j - 1];
      board[i + x][j - 1] = temp;

      if (scancheck) {
        board[i + x][j - 1] = board[i + x][j - 1].slice(0, 2) + "*";
      }
      clear("#", true);
    }
    if (board[i + x][j - 1][0] == char2) {
      board[i + x][j - 1] = board[i + x][j - 1].slice(0, 2) + "-";
    }
  }
  console;
  if (j < 7) {
    if (board[i + x][j + 1][0] == char1) {
      let temp = board[i + x][j + 1];
      board[i + x][j + 1] = board[i][j];
      board[i][j] = "   ";
      let scancheck = scan(char1, true);
      board[i][j] = board[i + x][j + 1];
      board[i + x][j + 1] = temp;
      if (scancheck)
        board[i + x][j + 1] = board[i + x][j + 1].slice(0, 2) + "*";
      clear("#", true);
    }
    if (board[i + x][j + 1][0] == char2) {
      board[i + x][j + 1] = board[i + x][j + 1].slice(0, 2) + "-";
    }
  }

  if (i == y) {
    if (board[i + x][j][0] == " ") {
      let temp = board[i + x][j];
      board[i + x][j] = board[i][j];
      board[i][j] = "   ";
      let scancheck = scan(char1, true);
      board[i][j] = board[i + x][j];
      board[i + x][j] = temp;
      if (scancheck) board[i + x][j] = board[i + x][j].slice(0, 2) + "*";
      clear("#", true);
      if (board[i + 2 * x][j][0] == " ") {
        let temp = board[i + 2 * x][j];
        board[i + 2 * x][j] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char1, true);
        board[i][j] = board[i + 2 * x][j];
        board[i + 2 * x][j] = temp;
        if (scancheck) {
          board[i + 2 * x][j] = board[i + 2 * x][j].slice(0, 2) + "*";
        }
        clear("#", true);
      }
    }
  } else {
    if (board[i + x][j][0] == " ") {
      let temp = board[i + x][j];
      board[i + x][j] = board[i][j];
      board[i][j] = "   ";
      let scancheck = scan(char1, true);
      board[i][j] = board[i + x][j];
      board[i + x][j] = temp;
      if (scancheck) board[i + x][j] = board[i + x][j].slice(0, 2) + "*";
      clear("#", true);
    }
  }
  //en passant

  if (i == y + x * 3) {
    if (j > 0) {
      if (board[i][j - 1][2] == "=") {
        let temp = board[i + x][j - 1];
        board[i + x][j - 1] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char1, true);
        board[i][j] = board[i + x][j - 1];
        board[i + x][j - 1] = temp;
        if (scancheck)
          board[i + x][j - 1] = board[i + x][j - 1].slice(0, 2) + "*";
        clear("#", true);
      }
    }
    if (j < 7) {
      if (board[i][j + 1][2] == "=") {
        let temp = board[i + x][j + 1];
        board[i + x][j + 1] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char1, true);
        board[i][j] = board[i + x][j + 1];
        board[i + x][j + 1] = temp;
        if (scancheck)
          board[i + x][j + 1] = board[i + x][j + 1].slice(0, 2) + "*";
        clear("#", true);
      }
    }
  }
}

async function pawnmove(
  i: number,
  j: number,
  x: number,
  y: number,
  char1: string, //opp
  char2: string //same
) {
  if (j > 0) {
    if (
      board[i + x][j - 1][0] == char1 &&
      board[i + x][j - 1][2] != "*" &&
      board[i + x][j - 1][2] != "="
    ) {
      board[i + x][j - 1] = board[i + x][j - 1].slice(0, 2) + "#";
      if (board[i + x][j - 1][1] == "K") {
        board[i + x][j - 1] = board[i + x][j - 1].slice(0, 2) + "@";
      }
    }
    if (
      board[i + x][j - 1][0] == char2 &&
      board[i + x][j - 1][2] != "*" &&
      board[i + x][j - 1][2] != "="
    ) {
      board[i + x][j - 1] = board[i + x][j - 1].slice(0, 2) + "-";
    }
  }
  if (j < 7) {
    if (
      board[i + x][j + 1][0] == char1 &&
      board[i + x][j + 1][2] != "*" &&
      board[i + x][j + 1][2] != "="
    ) {
      board[i + x][j + 1] = board[i + x][j + 1].slice(0, 2) + "#";
      if (board[i + x][j + 1][1] == "K") {
        board[i + x][j + 1] = board[i + x][j + 1].slice(0, 2) + "@";
      }
    }
    if (
      board[i + x][j + 1][0] == char2 &&
      board[i + x][j + 1][2] != "*" &&
      board[i + x][j + 1][2] != "="
    ) {
      board[i + x][j + 1] = board[i + x][j + 1].slice(0, 2) + "-";
    }
  }

  if (i == y) {
    if (
      board[i + x][j][0] == " " &&
      board[i + x][j][2] != "*" &&
      board[i + x][j][2] != "="
    ) {
      board[i + x][j] = board[i + x][j].slice(0, 2) + "#";
      if (
        board[i + 2 * x][j][0] == " " &&
        board[i + 2 * x][j][2] != "*" &&
        board[i + 2 * x][j][2] != "="
      )
        board[i + 2 * x][j] = board[i + 2 * x][j].slice(0, 2) + "#";
    }
  } else {
    if (
      board[i + x][j][0] == " " &&
      board[i + x][j][2] != "*" &&
      board[i + x][j][2] != "="
    )
      board[i + x][j] = board[i + x][j].slice(0, 2) + "#";
  }
}

async function bishop(i: number, j: number, char1: string, char2: string) {
  //char1 same and char2 opp
  let a = i,
    b = j;
  while (true) {
    //for right down
    if (a == 7 || b == 7) break;
    a++;
    b++;
    // console.log("hello");

    if (board[a][b][0] == char1) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else {
        let temp = board[a][b];
        board[a][b] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);

        board[i][j] = board[a][b];
        board[a][b] = temp;

        // console.log(scancheck);
        if (scancheck == true) board[a][b] = board[a][b].slice(0, 2) + "*";

        clear("#", true);
      }
      break;
    } else if (board[a][b][0] == " ") {
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      let scancheck = scan(char2, true);
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      // console.log(scancheck);
      console;
      if (scancheck == true) board[a][b] = "  *";
      clear("#", true);
    }
  }
  (a = i), (b = j);
  while (true) {
    //for left up
    if (a == 0 || b == 0) break;
    a--;
    b--;
    // console.log("hello");

    if (board[a][b][0] == char1) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else {
        let temp = board[a][b];
        board[a][b] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[a][b];
        board[a][b] = temp;
        // console.log(scancheck);
        if (scancheck == true) board[a][b] = board[a][b].slice(0, 2) + "*";
        clear("#", true);
      }

      break;
    } else if (board[a][b][0] == " ") {
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      let scancheck = scan(char2, true);
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      // console.log(scancheck);

      if (scancheck == true) board[a][b] = "  *";
      clear("#", true);
    }
  }

  (a = i), (b = j);
  while (true) {
    if (b == 7 || a == 0) break;
    a--;
    b++;

    if (board[a][b][0] == char1) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else {
        let temp = board[a][b];
        board[a][b] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[a][b];
        board[a][b] = temp;
        // console.log(scancheck);
        if (scancheck == true) board[a][b] = board[a][b].slice(0, 2) + "*";
        clear("#", true);
      }
      break;
    } else if (board[a][b][0] == " ") {
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      let scancheck = scan(char2, true);
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      // console.log(scancheck);

      if (scancheck == true) board[a][b] = "  *";
      clear("#", true);
    }
  }

  (a = i), (b = j);
  while (true) {
    if (a == 7 || b == 0) break;
    a++;
    b--;

    if (board[a][b][0] == char1) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else {
        let temp = board[a][b];
        board[a][b] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[a][b];
        board[a][b] = temp;
        // console.log(scancheck);
        if (scancheck == true) board[a][b] = board[a][b].slice(0, 2) + "*";
        clear("#", true);
      }
      break;
    } else if (board[a][b][0] == " ") {
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      let scancheck = scan(char2, true);
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      // console.log(scancheck);

      if (scancheck == true) board[a][b] = "  *";
      clear("#", true);
    }
  }
}

async function bishopmove(
  i: number,
  j: number,
  char1: string,
  char2: string,
  ask: boolean
) {
  //char1 same and char2 opp
  let a = i,
    b = j;
  while (true) {
    if (a == 7 || b == 7) break;
    a++;
    b++;
    // console.log("hello");

    if (
      board[a][b][0] == char1 &&
      board[a][b][2] != "*" &&
      board[a][b][2] != "="
    ) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
        board[a][b] = board[a][b].slice(0, 2) + "#";
      }
      break;
    } else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
      board[a][b] = "  #";
    }
    clear("#", ask);
  }
  (a = i), (b = j);
  while (true) {
    if (a == 0 || b == 0) break;
    a--;
    b--;
    // console.log("hello");

    if (
      board[a][b][0] == char1 &&
      board[a][b][2] != "*" &&
      board[a][b][2] != "="
    ) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
        board[a][b] = board[a][b].slice(0, 2) + "#";
      }
      break;
    } else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
      board[a][b] = "  #";
    }
    clear("#", ask);
  }
  (a = i), (b = j);
  while (true) {
    if (b == 7 || a == 0) break;
    a--;
    b++;
    // console.log("hello");

    if (
      board[a][b][0] == char1 &&
      board[a][b][2] != "*" &&
      board[a][b][2] != "="
    ) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
        board[a][b] = board[a][b].slice(0, 2) + "#";
      }
      break;
    } else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
      board[a][b] = "  #";
    }
    clear("#", ask);
  }
  (a = i), (b = j);
  while (true) {
    if (a == 7 || b == 0) break;
    a++;
    b--;
    // console.log("hello");

    if (
      board[a][b][0] == char1 &&
      board[a][b][2] != "*" &&
      board[a][b][2] != "="
    ) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
        board[a][b] = board[a][b].slice(0, 2) + "#";
      }
      break;
    } else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
      board[a][b] = "  #";
    }
    clear("#", ask);
  }
  //  clear("#", ask);
  // clear("-", ask);
}

async function rook(i: number, j: number, char1: string, char2: string) {
  let a = i,
    b = j;
  while (true) {
    if (a == 7) break;
    a++;

    if (board[a][b][0] == char1) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else {
        let temp = board[a][b];
        board[a][b] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[a][b];
        board[a][b] = temp;

        // console.log(scancheck);

        if (scancheck == true) board[a][b] = board[a][b].slice(0, 2) + "*";

        clear("#", true);
      }
      break;
    } else if (board[a][b][0] == " ") {
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      let scancheck = scan(char2, true);

      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];

      // console.log(scancheck);
      if (scancheck == true) board[a][b] = "  *";

      clear("#", true);
    }
  }
  (a = i), (b = j);
  while (true) {
    if (a == 0) break;
    a--;

    if (board[a][b][0] == char1) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else {
        let temp = board[a][b];
        board[a][b] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[a][b];
        board[a][b] = temp;
        // console.log(scancheck);
        if (scancheck == true) board[a][b] = board[a][b].slice(0, 2) + "*";
        clear("#", true);
      }
      break;
    } else if (board[a][b][0] == " ") {
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      let scancheck = scan(char2, true);
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      // console.log(scancheck);
      if (scancheck == true) board[a][b] = "  *";
      clear("#", true);
    }
  }
  (a = i), (b = j);

  while (true) {
    if (b == 7) break;
    b++;

    if (board[a][b][0] == char1) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else {
        let temp = board[a][b];
        board[a][b] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[a][b];
        board[a][b] = temp;
        // console.log(scancheck);
        if (scancheck == true) board[a][b] = board[a][b].slice(0, 2) + "*";
        clear("#", true);
      }
      break;
    } else if (board[a][b][0] == " ") {
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      let scancheck = scan(char2, true);
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];

      // console.log(scancheck);

      if (scancheck == true) board[a][b] = "  *";
      clear("#", true);
    }
  }
  (a = i), (b = j);

  while (true) {
    if (b == 0) break;
    b--;
    // console.log("hello");
    if (board[a][b][0] == char1) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else {
        let temp = board[a][b];
        board[a][b] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[a][b];
        board[a][b] = temp;

        // console.log(scancheck);
        if (scancheck == true) board[a][b] = board[a][b].slice(0, 2) + "*";

        clear("#", true);
      }
      break;
    } else if (board[a][b][0] == " ") {
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      let scancheck = scan(char2, true);
      [board[i][j], board[a][b]] = [board[a][b], board[i][j]];
      // console.log(scancheck);
      if (scancheck == true) board[a][b] = "  *";
      clear("#", true);
    }
  }
}
async function rookmove(i: number, j: number, char1: string, char2: string) {
  let a = i,
    b = j;

  while (true) {
    if (a == 7) break;
    a++;
    // if (board[a][b][2] == "*") continue;
    // console.log("hello");

    if (
      board[a][b][0] == char1 &&
      board[a][b][2] != "*" &&
      board[a][b][2] != "="
    ) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else if (board[a][b][2] != "*" && board[a][b][2] != "=")
        board[a][b] = board[a][b].slice(0, 2) + "#";
      break;
    } else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
      board[a][b] = "  #";
    }
  }

  (a = i), (b = j);
  while (true) {
    if (a == 0) break;
    a--;
    // if (board[a][b][2] == "*") continue;

    // console.log("hello");

    if (
      board[a][b][0] == char1 &&
      board[a][b][2] != "*" &&
      board[a][b][2] != "="
    ) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") {
        console.log("here");
        board[a][b] = board[a][b].slice(0, 2) + "@";
      } else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
        board[a][b] = board[a][b].slice(0, 2) + "#";
      }
      break;
    } else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
      board[a][b] = "  #";
    }
  }

  (a = i), (b = j);
  while (true) {
    if (b == 7) break;
    b++;
    // if (board[a][b][2] == "*") continue;

    // console.log("hello");

    if (
      board[a][b][0] == char1 &&
      board[a][b][2] != "*" &&
      board[a][b][2] != "="
    ) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else if (board[a][b][2] != "*" && board[a][b][2] != "=")
        board[a][b] = board[a][b].slice(0, 2) + "#";
      break;
    } else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
      board[a][b] = "  #";
    }
  }

  (a = i), (b = j);
  while (true) {
    if (b == 0) break;
    b--;
    // if (board[a][b][2] == "*") continue;

    // console.log("hello");

    if (
      board[a][b][0] == char1 &&
      board[a][b][2] != "*" &&
      board[a][b][2] != "="
    ) {
      board[a][b] = board[a][b].slice(0, 2) + "-";
      break; //char1 same colour & char2 opp colour
    } else if (board[a][b][0] == char2) {
      if (board[a][b][1] == "K") board[a][b] = board[a][b].slice(0, 2) + "@";
      else if (board[a][b][2] != "*" && board[a][b][2] != "=")
        board[a][b] = board[a][b].slice(0, 2) + "#";
      break;
    } else if (board[a][b][2] != "*" && board[a][b][2] != "=") {
      board[a][b] = "  #";
    }
  }
}

async function knight(i: number, j: number, char1: string) {
  // char1 same colour
  let char2 = "";
  if (char1 == "W") char2 = "B";
  else char2 = "W";
  if (i < 6) {
    if (j > 0) {
      if (board[i + 2][j - 1][0] != char1) {
        if (board[i + 2][j - 1][1] == "K")
          board[i + 2][j - 1] = board[i + 2][j - 1].slice(0, 2) + "@";
        else {
          let temp2 = board[i + 2][j - 1];
          board[i + 2][j - 1] = board[i][j];
          board[i][j] = "   ";
          let check4 = scan(char2, true);
          // console.log(check4);
          board[i][j] = board[i + 2][j - 1];
          board[i + 2][j - 1] = temp2;
          if (check4)
            board[i + 2][j - 1] = board[i + 2][j - 1].slice(0, 2) + "*";
          clear("#", true);
        }
      }
      if (board[i + 2][j - 1][0] == char1)
        board[i + 2][j - 1] = board[i + 2][j - 1].slice(0, 2) + "-";
    }
    if (j < 7) {
      if (board[i + 2][j + 1][0] != char1) {
        if (board[i + 2][j + 1][1] == "K")
          board[i + 2][j + 1] = board[i + 2][j + 1].slice(0, 2) + "@";
        else {
          let temp2 = board[i + 2][j + 1];
          board[i + 2][j + 1] = board[i][j];
          board[i][j] = "   ";
          let check4 = scan(char2, true);
          // console.log(check4);
          board[i][j] = board[i + 2][j + 1];
          board[i + 2][j + 1] = temp2;

          if (check4)
            board[i + 2][j + 1] = board[i + 2][j + 1].slice(0, 2) + "*";
          clear("#", true);
        }
      }
      if (board[i + 2][j + 1][0] == char1)
        board[i + 2][j + 1] = board[i + 2][j + 1].slice(0, 2) + "-";
    }
  }
  if (i > 1) {
    if (j > 0) {
      if (board[i - 2][j - 1][0] != char1) {
        if (board[i - 2][j - 1][1] == "K")
          board[i - 2][j - 1] = board[i - 2][j - 1].slice(0, 2) + "@";
        else {
          let temp2 = board[i - 2][j - 1];
          board[i - 2][j - 1] = board[i][j];
          board[i][j] = "   ";
          let check4 = scan(char2, true);
          // console.log(check4);
          board[i][j] = board[i - 2][j - 1];
          board[i - 2][j - 1] = temp2;
          if (check4)
            board[i - 2][j - 1] = board[i - 2][j - 1].slice(0, 2) + "*";
          clear("#", true);
        }
      }
      if (board[i - 2][j - 1][0] == char1)
        board[i - 2][j - 1] = board[i - 2][j - 1].slice(0, 2) + "-";
    }
    if (j < 7) {
      if (board[i - 2][j + 1][0] != char1) {
        if (board[i - 2][j + 1][1] == "K")
          board[i - 2][j + 1] = board[i - 2][j + 1].slice(0, 2) + "@";
        else {
          let temp2 = board[i - 2][j + 1];
          board[i - 2][j + 1] = board[i][j];
          board[i][j] = "   ";
          let check4 = scan(char2, true);
          // console.log(check4);
          board[i][j] = board[i - 2][j + 1];
          board[i - 2][j + 1] = temp2;
          if (check4)
            board[i - 2][j + 1] = board[i - 2][j + 1].slice(0, 2) + "*";
          clear("#", true);
        }
      }
      if (board[i - 2][j + 1][0] == char1)
        board[i - 2][j + 1] = board[i - 2][j + 1].slice(0, 2) + "-";
    }
  }
  if (j > 1) {
    if (i > 0) {
      if (board[i - 1][j - 2][0] != char1) {
        if (board[i - 1][j - 2][1] == "K")
          board[i - 1][j - 2] = board[i - 1][j - 2].slice(0, 2) + "@";
        else {
          let temp2 = board[i - 1][j - 2];
          board[i - 1][j - 2] = board[i][j];
          board[i][j] = "   ";
          let check4 = scan(char2, true);
          // console.log(check4);
          board[i][j] = board[i - 1][j - 2];
          board[i - 1][j - 2] = temp2;
          if (check4)
            board[i - 1][j - 2] = board[i - 1][j - 2].slice(0, 2) + "*";
          clear("#", true);
        }
      }
      if (board[i - 1][j - 2][0] == char1)
        board[i - 1][j - 2] = board[i - 1][j - 2].slice(0, 2) + "-";
    }
    if (i < 7) {
      if (board[i + 1][j - 2][0] != char1) {
        if (board[i + 1][j - 2][1] == "K")
          board[i + 1][j - 2] = board[i + 1][j - 2].slice(0, 2) + "@";
        else {
          let temp2 = board[i + 1][j - 2];
          board[i + 1][j - 2] = board[i][j];
          board[i][j] = "   ";
          let check4 = scan(char2, true);
          // console.log(check4);
          board[i][j] = board[i + 1][j - 2];
          board[i + 1][j - 2] = temp2;
          if (check4)
            board[i + 1][j - 2] = board[i + 1][j - 2].slice(0, 2) + "*";
          clear("#", true);
        }
      }
      if (board[i + 1][j - 2][0] == char1)
        board[i + 1][j - 2] = board[i + 1][j - 2].slice(0, 2) + "-";
    }
  }
  if (j < 6) {
    if (i > 0) {
      if (board[i - 1][j + 2][0] != char1) {
        if (board[i - 1][j + 2][1] == "K")
          board[i - 1][j + 2] = board[i - 1][j + 2].slice(0, 2) + "@";
        else {
          let temp2 = board[i - 1][j + 2];
          board[i - 1][j + 2] = board[i][j];
          board[i][j] = "   ";
          let check4 = scan(char2, true);
          // console.log(check4);
          board[i][j] = board[i - 1][j + 2];
          board[i - 1][j + 2] = temp2;
          if (check4)
            board[i - 1][j + 2] = board[i - 1][j + 2].slice(0, 2) + "*";
          clear("#", true);
        }
      }
      if (board[i - 1][j + 2][0] == char1)
        board[i - 1][j + 2] = board[i - 1][j + 2].slice(0, 2) + "-";
    }
    if (i < 7) {
      if (board[i + 1][j + 2][0] != char1) {
        if (board[i + 1][j + 2][1] == "K")
          board[i + 1][j + 2] = board[i + 1][j + 2].slice(0, 2) + "@";
        else {
          let temp2 = board[i + 1][j + 2];
          board[i + 1][j + 2] = board[i][j];
          board[i][j] = "   ";
          let check4 = scan(char2, true);
          // console.log(check4);
          board[i][j] = board[i + 1][j + 2];
          board[i + 1][j + 2] = temp2;
          if (check4)
            board[i + 1][j + 2] = board[i + 1][j + 2].slice(0, 2) + "*";
          clear("#", true);
        }
      }
      if (board[i + 1][j + 2][0] == char1)
        board[i + 1][j + 2] = board[i + 1][j + 2].slice(0, 2) + "-";
    }
  }
}
async function knightmove(i: number, j: number, char1: string) {
  // char1 same colour//char2 opp
  let char2 = "";
  if (char1 == "W") char2 = "B";
  else char2 = "W";
  if (i < 6) {
    //let 2 step 2
    if (j > 0) {
      if (
        board[i + 2][j - 1][0] == char2 &&
        board[i + 2][j - 1][2] != "*" &&
        board[i + 2][j - 1][2] != "="
      ) {
        //!=char1 = khali or opponnet

        if (board[i + 2][j - 1][1] == "K")
          board[i + 2][j - 1] = board[i + 2][j - 1].slice(0, 2) + "@";
        else board[i + 2][j - 1] = board[i + 2][j - 1].slice(0, 2) + "#";
      } else if (
        board[i + 2][j - 1][0] == char1 &&
        board[i + 2][j - 1][2] != "*" &&
        board[i + 2][j - 1][2] != "="
      )
        board[i + 2][j - 1] = board[i + 2][j - 1].slice(0, 2) + "-";
      else if (board[i + 2][j - 1][2] != "*" && board[i + 2][j - 1][2] != "=") {
        board[i + 2][j - 1] = "  #";
      }
    }
    if (j < 7) {
      if (
        board[i + 2][j + 1][0] == char2 &&
        board[i + 2][j + 1][2] != "*" &&
        board[i + 2][j + 1][2] != "="
      ) {
        if (board[i + 2][j + 1][1] == "K")
          board[i + 2][j + 1] = board[i + 2][j + 1].slice(0, 2) + "@";
        else board[i + 2][j + 1] = board[i + 2][j + 1].slice(0, 2) + "#";
      } else if (
        board[i + 2][j + 1][0] == char1 &&
        board[i + 2][j + 1][2] != "*" &&
        board[i + 2][j + 1][2] != "="
      )
        board[i + 2][j + 1] = board[i + 2][j + 1].slice(0, 2) + "-";
      else if (board[i + 2][j + 1][2] != "*" && board[i + 2][j + 1][2] != "=") {
        board[i + 2][j + 1] = "  #";
      }
    }
  }
  if (i > 1) {
    if (j > 0) {
      if (
        board[i - 2][j - 1][0] == char2 &&
        board[i - 2][j - 1][2] != "*" &&
        board[i - 2][j - 1][2] != "="
      ) {
        if (board[i - 2][j - 1][1] == "K")
          board[i - 2][j - 1] = board[i - 2][j - 1].slice(0, 2) + "@";
        else board[i - 2][j - 1] = board[i - 2][j - 1].slice(0, 2) + "#";
      } else if (
        board[i - 2][j - 1][0] == char1 &&
        board[i - 2][j - 1][2] != "*" &&
        board[i - 2][j - 1][2] != "="
      )
        board[i - 2][j - 1] = board[i - 2][j - 1].slice(0, 2) + "-";
      else if (board[i - 2][j - 1][2] != "*" && board[i - 2][j - 1][2] != "=") {
        board[i - 2][j - 1] = "  #";
      }
    }
    if (j < 7) {
      if (
        board[i - 2][j + 1][0] != char1 &&
        board[i - 2][j + 1][2] != "*" &&
        board[i - 2][j + 1][2] != "="
      ) {
        if (board[i - 2][j + 1][1] == "K")
          board[i - 2][j + 1] = board[i - 2][j + 1].slice(0, 2) + "@";
        else board[i - 2][j + 1] = board[i - 2][j + 1].slice(0, 2) + "#";
      } else if (
        board[i - 2][j + 1][0] == char1 &&
        board[i - 2][j + 1][2] != "*" &&
        board[i - 2][j + 1][2] != "="
      )
        board[i - 2][j + 1] = board[i - 2][j + 1].slice(0, 2) + "-";
      else if (board[i - 2][j + 1][2] != "*" && board[i - 2][j + 1][2] != "=") {
        board[i - 2][j + 1] = "  #";
      }
    }
  }
  if (j > 1) {
    if (i > 0) {
      if (
        board[i - 1][j - 2][0] != char1 &&
        board[i - 1][j - 2][2] != "*" &&
        board[i - 1][j - 2][2] != "="
      ) {
        if (board[i - 1][j - 2][1] == "K")
          board[i - 1][j - 2] = board[i - 1][j - 2].slice(0, 2) + "@";
        else board[i - 1][j - 2] = board[i - 1][j - 2].slice(0, 2) + "#";
      } else if (
        board[i - 1][j - 2][0] == char1 &&
        board[i - 1][j - 2][2] != "*" &&
        board[i - 1][j - 2][2] != "="
      )
        board[i - 1][j - 2] = board[i - 1][j - 2].slice(0, 2) + "-";
      else if (board[i - 1][j - 2][2] != "*" && board[i - 1][j - 2][2] != "=") {
        board[i - 1][j - 2] = "  #";
      }
    }
    if (i < 7) {
      if (
        board[i + 1][j - 2][0] != char1 &&
        board[i + 1][j - 2][2] != "*" &&
        board[i + 1][j - 2][2] != "="
      ) {
        if (board[i + 1][j - 2][1] == "K")
          board[i + 1][j - 2] = board[i + 1][j - 2].slice(0, 2) + "@";
        else board[i + 1][j - 2] = board[i + 1][j - 2].slice(0, 2) + "#";
      } else if (
        board[i + 1][j - 2][0] == char1 &&
        board[i + 1][j - 2][2] != "*" &&
        board[i + 1][j - 2][2] != "="
      )
        board[i + 1][j - 2] = board[i + 1][j - 2].slice(0, 2) + "-";
      else if (board[i + 1][j - 2][2] != "*" && board[i + 1][j - 2][2] != "=") {
        board[i + 1][j - 2] = "  #";
      }
    }
  }
  if (j < 6) {
    if (i > 0) {
      if (
        board[i - 1][j + 2][0] != char1 &&
        board[i - 1][j + 2][2] != "*" &&
        board[i - 1][j + 2][2] != "="
      ) {
        if (board[i - 1][j + 2][1] == "K")
          board[i - 1][j + 2] = board[i - 1][j + 2].slice(0, 2) + "@";
        else board[i - 1][j + 2] = board[i - 1][j + 2].slice(0, 2) + "#";
      } else if (
        board[i - 1][j + 2][0] == char1 &&
        board[i - 1][j + 2][2] != "*" &&
        board[i - 1][j + 2][2] != "="
      )
        board[i - 1][j + 2] = board[i - 1][j + 2].slice(0, 2) + "-";
      else if (board[i - 1][j + 2][2] != "*" && board[i - 1][j + 2][2] != "*") {
        board[i - 1][j + 2] = "  #";
      }
    }
    if (i < 7) {
      if (
        board[i + 1][j + 2][0] != char1 &&
        board[i + 1][j + 2][2] != "*" &&
        board[i + 1][j + 2][2] != "="
      ) {
        if (board[i + 1][j + 2][1] == "K")
          board[i + 1][j + 2] = board[i + 1][j + 2].slice(0, 2) + "@";
        else board[i + 1][j + 2] = board[i + 1][j + 2].slice(0, 2) + "#";
      } else if (
        board[i + 1][j + 2][0] == char1 &&
        board[i + 1][j + 2][2] != "*" &&
        board[i + 1][j + 2][2] != "="
      )
        board[i + 1][j + 2] = board[i + 1][j + 2].slice(0, 2) + "-";
      else if (board[i + 1][j + 2][2] != "*" && board[i + 1][j + 2][2] != "=") {
        board[i + 1][j + 2] = "  #";
      }
    }
  }
}
async function king(i: number, j: number, char1: string) {
  //char1 same colour
  let char2 = "";
  if (char1 == "W") char2 = "B";
  else char2 = "W";
  let x, y;
  if (char1 == "B") {
    x = 0;
    y = 4;
  } else {
    x = 7;
    y = 4;
  }
  if (i == x && j == y) {
    console.log("in");
    console.log("wc = ", wc, "wrc = ", wrc);
    if (
      (char1 == "B" && brc == true && bc == true) ||
      (char1 == "W" && wrc == true && wc == true)
    ) {
      scan(char2, false);
      console.log("here");
      console.table(board);
      if (board[i][j][2] != "@") {
        if (
          board[i][j + 1] == "   " &&
          board[i][j + 2] == "   " &&
          board[i][j + 3].slice(0, 2) == char1 + "R"
        ) {
          console.log("hii9");
          board[i][j + 2] = board[i][j + 2].slice(0, 2) + "+";
        }
      }
      clear("-", true);
      clear("@", true);
      clear("#", true);
    }
  }
  if (i == x && j == y) {
    if (
      (char1 == "B" && blc == true && bc == true) ||
      (char1 == "W" && wlc == true && wc == true)
    ) {
      scan(char2, false);
      if (board[i][j][2] != "@") {
        if (
          board[i][j - 1] == "   " &&
          board[i][j - 2] == "   " &&
          board[i][j - 3] == "   " &&
          board[i][j - 4].slice(0, 2) == char1 + "R"
        ) {
          board[i][j - 2] = board[i][j - 2].slice(0, 2) + "+";
        }
      }
      clear("-", true);
      clear("@", true);
      clear("#", true);
    }
  }

  if (j < 7) {
    if (
      board[i][j + 1][0] != char1 &&
      board[i][j + 1][2] != "*" &&
      board[i][j + 1][2] != "-" &&
      board[i][j + 1][2] != "#"
    ) {
      let temp = board[i][j + 1];
      board[i][j + 1] = board[i][j];
      board[i][j] = "   ";
      let scancheck = scan(char2, true);
      board[i][j] = board[i][j + 1];
      board[i][j + 1] = temp;

      if (scancheck) board[i][j + 1] = board[i][j + 1].slice(0, 2) + "+";
      clear("#", true);
    }
    if (board[i][j + 1][0] == char1)
      board[i][j + 1] = board[i][j + 1].slice(0, 2) + "-";

    if (i > 0) {
      if (
        board[i - 1][j + 1][0] != char1 &&
        board[i - 1][j + 1][2] != "*" &&
        board[i - 1][j + 1][2] != "-" &&
        board[i - 1][j + 1][2] != "#"
      ) {
        let temp = board[i - 1][j + 1];
        board[i - 1][j + 1] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[i - 1][j + 1];
        board[i - 1][j + 1] = temp;
        if (scancheck)
          board[i - 1][j + 1] = board[i - 1][j + 1].slice(0, 2) + "+";
        clear("#", true);
      }
      if (board[i - 1][j + 1][0] == char1)
        board[i - 1][j + 1] = board[i - 1][j + 1].slice(0, 2) + "-";
    }
    if (i < 7) {
      if (
        board[i + 1][j + 1][0] != char1 &&
        board[i + 1][j + 1][2] != "*" &&
        board[i + 1][j + 1][2] != "-" &&
        board[i + 1][j + 1][2] != "#"
      ) {
        let temp = board[i + 1][j + 1];
        board[i + 1][j + 1] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[i + 1][j + 1];
        board[i + 1][j + 1] = temp;
        if (scancheck)
          board[i + 1][j + 1] = board[i + 1][j + 1].slice(0, 2) + "+";
        clear("#", true);
      }
      if (board[i + 1][j + 1][0] == char1)
        board[i + 1][j + 1] = board[i + 1][j + 1].slice(0, 2) + "-";
    }
  }
  if (j > 0) {
    if (
      board[i][j - 1][0] != char1 &&
      board[i][j - 1][2] != "*" &&
      board[i][j - 1][2] != "-" &&
      board[i][j - 1][2] != "#"
    ) {
      let temp = board[i][j - 1];
      board[i][j - 1] = board[i][j];
      board[i][j] = "   ";
      let scancheck = scan(char2, true);
      board[i][j] = board[i][j - 1];
      board[i][j - 1] = temp;
      if (scancheck) board[i][j - 1] = board[i][j - 1].slice(0, 2) + "+";
      clear("#", true);
    }
    if (board[i][j - 1][0] == char1)
      board[i][j - 1] = board[i][j - 1].slice(0, 2) + "-";

    if (i > 0) {
      if (
        board[i - 1][j - 1][0] != char1 &&
        board[i - 1][j - 1][2] != "*" &&
        board[i - 1][j - 1][2] != "-" &&
        board[i - 1][j - 1][2] != "#"
      ) {
        let temp = board[i - 1][j - 1];
        board[i - 1][j - 1] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[i - 1][j - 1];
        board[i - 1][j - 1] = temp;
        if (scancheck)
          board[i - 1][j - 1] = board[i - 1][j - 1].slice(0, 2) + "+";
        clear("#", true);
      }
      if (board[i - 1][j - 1][0] == char1)
        board[i - 1][j - 1] = board[i - 1][j - 1].slice(0, 2) + "-";
    }
    if (i < 7) {
      if (
        board[i + 1][j - 1][0] != char1 &&
        board[i + 1][j - 1][2] != "*" &&
        board[i + 1][j - 1][2] != "-" &&
        board[i + 1][j - 1][2] != "#"
      ) {
        let temp = board[i + 1][j - 1];
        board[i + 1][j - 1] = board[i][j];
        board[i][j] = "   ";
        let scancheck = scan(char2, true);
        board[i][j] = board[i + 1][j - 1];
        board[i + 1][j - 1] = temp;
        if (scancheck)
          board[i + 1][j - 1] = board[i + 1][j - 1].slice(0, 2) + "+";
        clear("#", true);
      }
      if (board[i + 1][j - 1][0] == char1)
        board[i + 1][j - 1] = board[i + 1][j - 1].slice(0, 2) + "-";
    }
  }
  if (i > 0) {
    if (
      board[i - 1][j][0] != char1 &&
      board[i - 1][j][2] != "*" &&
      board[i - 1][j][2] != "-" &&
      board[i - 1][j][2] != "#"
    ) {
      let temp = board[i - 1][j];
      board[i - 1][j] = board[i][j];
      board[i][j] = "   ";
      let scancheck = scan(char2, true);
      board[i][j] = board[i - 1][j];
      board[i - 1][j] = temp;
      if (scancheck) board[i - 1][j] = board[i - 1][j].slice(0, 2) + "+";
      clear("#", true);
    }
    if (board[i - 1][j][0] == char1)
      board[i - 1][j] = board[i - 1][j].slice(0, 2) + "-";
  }
  if (i < 7) {
    if (
      board[i + 1][j][0] != char1 &&
      board[i + 1][j][2] != "*" &&
      board[i + 1][j][2] != "-" &&
      board[i + 1][j][2] != "#"
    ) {
      let temp = board[i + 1][j];
      board[i + 1][j] = board[i][j];
      board[i][j] = "   ";
      let scancheck = scan(char2, true);
      board[i][j] = board[i + 1][j];
      board[i + 1][j] = temp;
      if (scancheck) board[i + 1][j] = board[i + 1][j].slice(0, 2) + "+";
      clear("#", true);
    }
    if (board[i + 1][j][0] == char1)
      board[i + 1][j] = board[i + 1][j].slice(0, 2) + "-";
  }
  // clear("*");
}

async function kingmove(i: number, j: number, char1: string) {
  //char1 same colour

  if (j < 7) {
    if (
      board[i][j + 1][0] != char1 &&
      board[i][j + 1][2] != "*" &&
      board[i][j + 1][2] != "-" &&
      board[i][j + 1][2] != "#"
    )
      board[i][j + 1] = board[i][j + 1].slice(0, 2) + "!";
    if (board[i][j + 1][0] == char1 && board[i][j + 1][2] != "*")
      board[i][j + 1] = board[i][j + 1].slice(0, 2) + "-";

    if (i > 0) {
      if (
        board[i - 1][j + 1][0] != char1 &&
        board[i - 1][j + 1][2] != "*" &&
        board[i - 1][j + 1][2] != "-" &&
        board[i - 1][j + 1][2] != "#"
      )
        board[i - 1][j + 1] = board[i - 1][j + 1].slice(0, 2) + "!";
      if (board[i - 1][j + 1][0] == char1 && board[i - 1][j + 1][2] != "*")
        board[i - 1][j + 1] = board[i - 1][j + 1].slice(0, 2) + "-";
    }
    if (i < 7) {
      if (
        board[i + 1][j + 1][0] != char1 &&
        board[i + 1][j + 1][2] != "*" &&
        board[i + 1][j + 1][2] != "-" &&
        board[i + 1][j + 1][2] != "#"
      )
        board[i + 1][j + 1] = board[i + 1][j + 1].slice(0, 2) + "!";
      if (board[i + 1][j + 1][0] == char1 && board[i + 1][j + 1][2] != "*")
        board[i + 1][j + 1] = board[i + 1][j + 1].slice(0, 2) + "-";
    }
  }
  if (j > 0) {
    if (
      board[i][j - 1][0] != char1 &&
      board[i][j - 1][2] != "*" &&
      board[i][j - 1][2] != "-" &&
      board[i][j - 1][2] != "#"
    )
      board[i][j - 1] = board[i][j - 1].slice(0, 2) + "!";
    if (board[i][j - 1][0] == char1 && board[i][j - 1][2] != "*")
      board[i][j - 1] = board[i][j - 1].slice(0, 2) + "-";

    if (i > 0) {
      if (
        board[i - 1][j - 1][0] != char1 &&
        board[i - 1][j - 1][2] != "*" &&
        board[i - 1][j - 1][2] != "-" &&
        board[i - 1][j - 1][2] != "#"
      )
        board[i - 1][j - 1] = board[i - 1][j - 1].slice(0, 2) + "!";
      if (board[i - 1][j - 1][0] == char1 && board[i - 1][j - 1][2] != "*")
        board[i - 1][j - 1] = board[i - 1][j - 1].slice(0, 2) + "-";
    }
    if (i < 7) {
      if (
        board[i + 1][j - 1][0] != char1 &&
        board[i + 1][j - 1][2] != "*" &&
        board[i + 1][j - 1][2] != "-" &&
        board[i + 1][j - 1][2] != "#"
      )
        board[i + 1][j - 1] = board[i + 1][j - 1].slice(0, 2) + "!";
      if (board[i + 1][j - 1][0] == char1 && board[i + 1][j - 1][2] != "*")
        board[i + 1][j - 1] = board[i + 1][j - 1].slice(0, 2) + "-";
    }
  }
  if (i > 0) {
    if (
      board[i - 1][j][0] != char1 &&
      board[i - 1][j][2] != "*" &&
      board[i - 1][j][2] != "-" &&
      board[i - 1][j][2] != "#"
    )
      board[i - 1][j] = board[i - 1][j].slice(0, 2) + "!";
    if (board[i - 1][j][0] == char1 && board[i - 1][j][2] != "*")
      board[i - 1][j] = board[i - 1][j].slice(0, 2) + "-";
  }
  if (i < 7) {
    if (
      board[i + 1][j][0] != char1 &&
      board[i + 1][j][2] != "*" &&
      board[i + 1][j][2] != "-" &&
      board[i + 1][j][2] != "#"
    )
      board[i + 1][j] = board[i + 1][j].slice(0, 2) + "!";
    if (board[i + 1][j][0] == char1 && board[i + 1][j][2] != "*")
      board[i + 1][j] = board[i + 1][j].slice(0, 2) + "-";
  }
  // clear("*");
}
// C:\Users\navneet\Documents\chatbot\typequestion\chess
