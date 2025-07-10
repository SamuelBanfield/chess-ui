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
    <div className="p-3 pt-0 bg-white shadow-lg">
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Colour:
        </label>
        <select 
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={colour} 
          onChange={(e) => setColour(e.target.value)}
        >
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-2">Viewing games for Players:</h2>
      
      <div className="space-y-1">
      {importedPlayers.map((player, index) => (
      <div key={index} className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded-md border border-gray-200">
      <input
        type="checkbox"
        checked={player.enabled}
        onChange={(event) => {
        const updated = [...importedPlayers];
        updated[index] = {...player, enabled: event.target.checked};
        setImportedPlayers(updated);  
        }}
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-gray-800">
        {player.username} ({player.site === "lichess" ? "Lichess" : "Chess.com"})
      </span>
      </div>
      ))}
      </div>
    </div>
  );
}