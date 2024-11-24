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
  const [errorText, setErrorText] = useState('');

  const importGames = async () => {
    setErrorText('');
    try {
      const response = await fetch(`/api/import/${importType}/${importUser}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Import complete, total new games imported: " + data);
        setImportedPlayers([...importedPlayers, {username: importUser, site: importType, enabled: true}]);
      }
      else {
        setErrorText(response.status === 404 ? 'User not found' : 'Error importing games');
        console.error('Error:', response);
      }
    } 
    catch (error) {
      console.error('Error:', error);
      setErrorText('Unexpected error importing games');
    }
  };

  return (
    <div>
      <div className="flex border-gray border-2">
        <input type="text" value={importUser} placeholder='Username' onChange={(e) => setImportUser(e.target.value)} className="px-1 border-gray-300" />
        <select value={importType} onChange={(e) => setImportType(e.target.value)}>
          <option value="chessdotcom">Chess.com</option>
          <option value="lichess">Lichess</option>
        </select>
        <button onClick={importGames} className="px-2 bg-blue-500 text-white">Import</button>
      </div>
      <p className="text-red-500 text-xs">{errorText || '\u00A0'}</p>
    </div>
  );
}