"use client";

import { Chess } from "chess.js";
import { useEffect, useState } from "react";

export default function Games({ game, setGame }) {

  const [gamesBar, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/games?fen=${encodeURIComponent(game.fen())}`);
        const data = await response.json();
        console.log(data); // Process the fetched data here
        setGames(data);
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
              ?.sort((a: any, b: any) => b.frequency - a.frequency)
              .map((move: any, index: any) => (
                  <div
                      key={index}
                      onClick={() => setGame(new Chess(move.move.endingFEN))}
                      className="border w-48 py-2 bg-gray-200 hover:bg-gray-400 text-center mx-auto max-w-400">
                      {move.move.move + ", " + move.frequency}
                  </div>
              ))}
      </div>
  );
}