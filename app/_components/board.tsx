"use client";

import { Chess } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";

type GameProps = {
  positionStack: string[];
  setPositionStack: (positionStack: string[]) => void;
};

export default function Board({ positionStack, setPositionStack }: GameProps) {

  const [game, setGame] = useState(new Chess());

  return (
    <div className="w-2/3" >
      <Chessboard
        position={positionStack[positionStack.length - 1]}
        onPieceDrop={(sourceSquare, targetSquare, piece) => {
          console.log("Attempting to move", piece, "from", sourceSquare, "to", targetSquare, "p");
          try {
            const gameCopy = new Chess(positionStack[positionStack.length - 1]);
            gameCopy.move({
              from: sourceSquare,
              to: targetSquare,
              promotion: piece[1].toLowerCase()
            });
            setPositionStack([...positionStack, gameCopy.fen()]);
            return true;
          }
          catch (error) {
            console.error("Illegal move");
            return false;
          }
        }}
      />
    </div>
  );

}