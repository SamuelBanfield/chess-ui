"use client";

import React, { useState } from 'react';
import { ImportedPlayer } from './players';

type ImportGamesProps = {
  importedPlayers: ImportedPlayer[];
  setImportedPlayers: (importedPlayers: ImportedPlayer[]) => void;
};

export default function ImportGames({ importedPlayers, setImportedPlayers }: ImportGamesProps) {

  const [importUser, setImportUser] = useState('');
  const [importType, setImportType] = useState('chessdotcom');

  const importGames = async () => {
    try {
      const response = await fetch(`/api/import/${importType}/${importUser}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Import complete, total new games imported: " + data);
        setImportedPlayers([...importedPlayers, {username: importUser, site: importType, enabled: true}]);
      }
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="flex">
        <input type="text" value={importUser} placeholder='Username' onChange={(e) => setImportUser(e.target.value)} className="px-1 border-gray-300" />
        <select value={importType} onChange={(e) => setImportType(e.target.value)}>
          <option value="chessdotcom">Chess.com</option>
          <option value="lichess">Lichess</option>
        </select>
        <button onClick={importGames} className="px-2 bg-blue-500 text-white">Import</button>
      </div>
    </div>
  );
}