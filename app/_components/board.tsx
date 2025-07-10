"use client";

import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { FenWithMove } from "../page";

type GameProps = {
  positionStack: FenWithMove[];
  setPositionStack: (positionStack: FenWithMove[]) => void;
};

export default function Board({ positionStack, setPositionStack }: GameProps) {

  return (
    <Chessboard
      position={positionStack[positionStack.length - 1].fen}
      onPieceDrop={(sourceSquare, targetSquare, piece) => {
        console.log("Attempting to move", piece, "from", sourceSquare, "to", targetSquare, "p");
        try {
          const gameCopy = new Chess(positionStack[positionStack.length - 1].fen);
          gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece[1].toLowerCase()
          });
          setPositionStack([...positionStack, {fen: gameCopy.fen(), move: gameCopy.history().slice(-1)[0] || null}]);
          return true;
        }
        catch (error) {
          console.error("Illegal move");
          return false;
        }
      }}
    />
  );

}