"use client"

import { useState } from "react";
import Games from "./games";
import ImportGames from "./importGames";
import Players, { ImportedPlayer } from "./players";

type InfoPanelProps = {
  positionStack: string[];
  setPositionStack: (positionStack: string[]) => void;
};

const initialPlayers: ImportedPlayer[] = [
  {username: "samjban", site: "lichess", enabled: true},
  {username: "Wertsy10", site: "chessdotcom", enabled: true},
];

export default function InfoPanel({ positionStack, setPositionStack }: InfoPanelProps) {

  const [colour, setColour] = useState<string>('white')
  const [importedPlayers, setImportedPlayers] = useState<ImportedPlayer[]>(initialPlayers);

  return (
    <div>
      <ImportGames importedPlayers={importedPlayers} setImportedPlayers={setImportedPlayers}/>
      <Players importedPlayers={importedPlayers} setImportedPlayers={setImportedPlayers} colour={colour} setColour={setColour} />
      <Games positionStack={positionStack} setPositionStack={setPositionStack} colour={colour} importedPlayers={importedPlayers} />
    </div>
  );
}