"use client"

import { useState } from "react";
import Games from "./games";
import ImportGames from "./importGames";
import Players, { ImportedPlayer } from "./players";
import Note from "./note";
import { FenWithMove } from "../page";

type InfoPanelProps = {
  positionStack: FenWithMove[];
  setPositionStack: (positionStack: FenWithMove[]) => void;
};

const initialPlayers: ImportedPlayer[] = [
  {username: "samjban", site: "lichess", enabled: true},
  {username: "Wertsy10", site: "chessdotcom", enabled: true},
];

export default function InfoPanel({ positionStack, setPositionStack }: InfoPanelProps) {

  const [colour, setColour] = useState<string>('white')
  const [importedPlayers, setImportedPlayers] = useState<ImportedPlayer[]>(initialPlayers);

  return (
    <div className="h-[90vh] flex flex-col justify-between">
      <div>
        <ImportGames importedPlayers={importedPlayers} setImportedPlayers={setImportedPlayers}/>
        <Players importedPlayers={importedPlayers} setImportedPlayers={setImportedPlayers} colour={colour} setColour={setColour} />
        <Games positionStack={positionStack} setPositionStack={setPositionStack} colour={colour} importedPlayers={importedPlayers} />
      </div>
      <Note positionStack={positionStack} />
    </div>
  );
}