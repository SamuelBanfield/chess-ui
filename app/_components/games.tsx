"use client";

import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { ImportedPlayer } from "./players";
import { FenWithMove } from "../page";

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
  positionStack: FenWithMove[];
  setPositionStack: (positionStack: FenWithMove[]) => void;
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
        params.append('fen', positionStack[positionStack.length - 1].fen);
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
    <div className="p-3 pt-0 bg-white rounded-b-lg shadow-lg flex flex-col">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">Games:</h2>
      
      <div className="flex-1 overflow-y-auto space-y-1 max-h-48">
      {gamesBar
      ?.sort((a: MoveWithFrequency, b: MoveWithFrequency) => totalGames(b) - totalGames(a))
      .map((move: MoveWithFrequency, index: any) => (
      <div
        key={index}
        onClick={() => {
        const newMove = {fen: move.move.endingFEN, move: move.move.move};
        const lastMove = positionStack[positionStack.length - 1];
        if (lastMove?.fen !== newMove.fen) {
        setPositionStack([...positionStack, newMove]);
        }
        }}
        className="relative w-full h-5 py-3 border border-gray-200 hover:border-gray-400 hover:cursor-pointer rounded-md bg-gray-500"
      >
        <div
        className="absolute top-1/2 transform -translate-y-1/2 bg-gray-300 h-full rounded-md"
        style={{ width: Math.floor(100 * (move.whiteWins + move.draws) / totalGames(move)) + "%" }}
        />
        <div
        className="absolute top-1/2 transform -translate-y-1/2 bg-white h-full rounded-md"
        style={{ width: Math.floor(100 * move.whiteWins / totalGames(move)) + "%" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-800">
        {move.move.move + ", " + move.whiteWins + "/" + move.draws + "/" + move.blackWins}
        </div>
      </div>
      ))
      }
      </div>
    </div>
  );
}