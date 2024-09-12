"use client";

import Board from "./_components/board";
import Games from "./_components/games";
import { Chess } from 'chess.js';
import { useState } from "react";

export default function Home() {

  const [game, setGame] = useState(new Chess());

  return (

    <main className="flex justify-center p-24">
      <Board game={game} setGame={setGame} />
      <Games game={game} />
      
    </main>
  );
}
