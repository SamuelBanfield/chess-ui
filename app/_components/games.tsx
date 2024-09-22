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
            className="border bg-gray-200 hover:bg-gray-400 text-center">
            {move.move.move + ", " + move.whiteWins + "/" + move.draws + "/" + move.blackWins}
          </div>
        ))
      }
    </div>
  );
}