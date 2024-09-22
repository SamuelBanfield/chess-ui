"use client";

import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { ImportedPlayer } from "./players";

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
  positionStack: string[];
  setPositionStack: (positionStack: string[]) => void;
  colour: string;
  importedPlayers: ImportedPlayer[];
};

const totalGames = (moveWithFrequency: MoveWithFrequency) => {
  return moveWithFrequency.whiteWins + moveWithFrequency.blackWins + moveWithFrequency.draws;
}

export default function Games({ positionStack, setPositionStack, colour, importedPlayers } : GameProps) {

  const [gamesBar, setGamesBar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        params.append('fen', positionStack[positionStack.length - 1]);
        params.append('colour', colour);
        params.append('sources', importedPlayers.filter((player) => player.enabled).map((player) => `${player.username}@${player.site}`).join(','));
        const url = `/api/game?${params.toString()}`;
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setGamesBar(data);
        }
        else {
          console.error('Error:', response);
        }

      } 
      catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [positionStack, importedPlayers, colour]);

  return (
    <div>
      {gamesBar
        ?.sort((a: MoveWithFrequency, b: MoveWithFrequency) => totalGames(b) - totalGames(a))
        .map((move: MoveWithFrequency, index: any) => (
          <div
            key={index}
            onClick={() => setPositionStack([...positionStack, move.move.endingFEN])}
            className="bg-gray-500 g-gray-400 text-center relative w-full h-5 py-3 border-2 border-white hover:border-black hover:cursor-pointer"
          >
            <div
              className="absolute top-1/2 transform -translate-y-1/2 bg-gray-300 h-full"
              style={{ width: Math.floor(100 * (move.whiteWins + move.draws) / totalGames(move)) + "%" }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 bg-white h-full"
              style={{ width: Math.floor(100 * move.whiteWins / totalGames(move)) + "%" }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base">
              {move.move.move + ", " + move.whiteWins + "/" + move.draws + "/" + move.blackWins}
            </div>
          </div>
        ))
      }
    </div>
  );
}