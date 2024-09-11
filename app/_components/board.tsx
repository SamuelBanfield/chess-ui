"use client";

import { Chess } from "chess.js";
import { Chessboard, ChessboardDnDProvider } from "react-chessboard";

export default function Board({ game, setGame }) {

  return (
    <ChessboardDnDProvider>
      <Chessboard
        position={game.fen()}
        boardWidth={640}
        onPieceDrop={(sourceSquare, targetSquare, piece) => {
          console.log("Attempting to move", piece, "from", sourceSquare, "to", targetSquare, "p");
          try {
            const gameCopy = new Chess(game.fen());
            gameCopy.move({
              from: sourceSquare,
              to: targetSquare,
              promotion: piece[1].toLowerCase()
            });
            setGame(gameCopy);
            return true;
          }
          catch (error) {
            console.error("Illegal move");
            return false;
          }
        }}
      />

    </ChessboardDnDProvider>
  );

}