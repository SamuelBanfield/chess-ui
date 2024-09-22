"use client";

import Board from "./_components/board";
import { useEffect, useState } from "react";
import InfoPanel from "./_components/infoPanel";

const startingFEN : string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

export default function Home() {

  const [positionStack, setPositionStack] = useState([startingFEN]);

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
    <main className="flex justify-center p-24">
      <div className="w-1/2">
        <Board positionStack={positionStack} setPositionStack={setPositionStack} />
      </div>
      <div className="w-1/2">
        <InfoPanel positionStack={positionStack} setPositionStack={setPositionStack} />
      </div>
    </main>
  );
}
