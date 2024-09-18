"use client"

import Games from "./games";
import ImportGames from "./importGames";

type InfoPanelProps = {
  positionStack: string[];
  setPositionStack: (positionStack: string[]) => void;
};

export default function InfoPanel({ positionStack, setPositionStack }: InfoPanelProps) {
  return (
    <div>
      <ImportGames />
      <Games positionStack={positionStack} setPositionStack={setPositionStack} />
    </div>
  );
}