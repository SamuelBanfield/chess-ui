"use client";

import Board from "./_components/board";
import { useEffect, useState } from "react";
import InfoPanel from "./_components/infoPanel";
import Moves from "./_components/moves";

const startingFEN : string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

export type FenWithMove = {
    fen: string;
    move: string | null;
  }

export default function Home() {

  const [positionStack, setPositionStack] = useState<FenWithMove[]>([{fen: startingFEN, move: null}]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        if (positionStack.length > 1) {
          setPositionStack(positionStack.slice(0, positionStack.length - 1));
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [positionStack]);

  return (
    <main className="flex justify-center pt-12">
      <div className="w-1/6">
        <Moves positionStack={positionStack} setPositionStack={setPositionStack} />
      </div>
      <div className="w-1/2">
        <Board positionStack={positionStack} setPositionStack={setPositionStack} />
      </div>
      <div className="w-1/4">
        <InfoPanel positionStack={positionStack} setPositionStack={setPositionStack} />
      </div>
    </main>
  );
}
