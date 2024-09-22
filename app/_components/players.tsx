"use client";

export type ImportedPlayer = {
  username: string;
  site: string;
  enabled: boolean;
}

type PlayersProps = {
  importedPlayers: ImportedPlayer[];
  setImportedPlayers: (importedPlayers: ImportedPlayer[]) => void;
  colour: string;
  setColour: (colour: string) => void;
}

export default function Players({ importedPlayers, setImportedPlayers, colour, setColour }: PlayersProps) {

  return (
    <div>
      <select value={colour} onChange={(e) => setColour(e.target.value)}>
        <option value="white">White</option>
        <option value="black">Black</option>
      </select>
      <h2 className="text-xs">Viewing games for Players:</h2>
      {importedPlayers.map((player, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={player.enabled}
            onChange={(event) => {
              const updated = [...importedPlayers];
              updated[index] = {...player, enabled: event.target.checked};
              setImportedPlayers(updated);  
            }}
          />
          <span>{player.username} ({player.site === "lichess" ? "Lichess" : "Chess.com"})</span>
        </div>
      ))}
    </div>
  );
}