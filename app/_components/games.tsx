"use client";

import { Chess } from "chess.js";
import { useEffect, useState } from "react";

type MoveWithFrequency = {
  move: {
    move: string;
    endingFEN: string;
  };
  whiteWins: number;
  draws: number;
  blackWins: number;
};

type GameProps = {
  game: Chess;
  setGame: (game: Chess) => void;
};

const totalGames = (moveWithFrequency: MoveWithFrequency) => {
  return moveWithFrequency.whiteWins + moveWithFrequency.blackWins + moveWithFrequency.draws;
}

export default function Games({ game, setGame } : GameProps) {

  const [gamesBar, setGamesBar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/games?fen=${encodeURIComponent(game.fen())}`);
        const data = await response.json();
        console.log(data); // Process the fetched data here
        setGamesBar(data);
      } 
      catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [game]);

  return (
      <div className="w-screen/3">
          <h1>Games</h1>
          {gamesBar
              ?.sort((a: MoveWithFrequency, b: MoveWithFrequency) => totalGames(b) - totalGames(a))
              .map((move: MoveWithFrequency, index: any) => (
                  <div
                      key={index}
                      onClick={() => setGame(new Chess(move.move.endingFEN))}
                      className="border w-48 py-2 bg-gray-200 hover:bg-gray-400 text-center mx-auto max-w-400">
                      {move.move.move + ", " + move.whiteWins + "/" + move.draws + "/" + move.blackWins}
                  </div>
              ))}
      </div>
  );
}