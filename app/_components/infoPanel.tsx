"use client"

import { useState } from "react";
import Games from "./games";
import ImportGames from "./importGames";
import Players, { ImportedPlayer } from "./players";

type InfoPanelProps = {
  positionStack: string[];
  setPositionStack: (positionStack: string[]) => void;
};

export default function InfoPanel({ positionStack, setPositionStack }: InfoPanelProps) {

  const [colour, setColour] = useState<string>('white')
  const [importedPlayers, setImportedPlayers] = useState<ImportedPlayer[]>([]);

  return (
    <div>
      <Games positionStack={positionStack} setPositionStack={setPositionStack} colour={colour} importedPlayers={importedPlayers} />
      <Players importedPlayers={importedPlayers} setImportedPlayers={setImportedPlayers} colour={colour} setColour={setColour} />
      <ImportGames importedPlayers={importedPlayers} setImportedPlayers={setImportedPlayers}/>
    </div>
  );
}