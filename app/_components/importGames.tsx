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
    <div className="max-w-md mx-auto bg-white rounded-t-lg shadow-lg p-3">
      <input 
        type="text" 
        value={importUser} 
        placeholder="Username" 
        onChange={(e) => setImportUser(e.target.value)} 
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
      />
      <div className="flex gap-2 mb-2 w-full">
      <select 
        value={importType} 
        onChange={(e) => setImportType(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="chessdotcom">Chess.com</option>
        <option value="lichess">Lichess</option>
      </select>
      <button 
        onClick={importGames} 
        className="flex-shrink-0 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 font-medium"
      >
      Import
      </button>
      </div>
      <p className="text-red-500 text-sm min-h-[1rem]">{errorText}</p>
    </div>
  );
}