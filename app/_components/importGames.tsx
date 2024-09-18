"use client";

import React, { useState } from 'react';

export default function ImportGames() {
  const [inputText, setInputText] = useState('');
  const [importType, setImportType] = useState('chessdotcom');

  const importGames = async () => {
    try {
      const response = await fetch(`/api/games/${importType}/${inputText}/import`, {
        method: 'POST',
      });
      const data = await response.json();
      console.log("Import complete, imported: " + data);
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="w-1/4">
        <div className="flex">
          <label>Username:</label>
          <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} className="px-2 py-1 border-gray-300 rounded" />
          <button onClick={importGames} className="px-2 py-2 bg-blue-500 text-white rounded">Import</button>
        </div>
        <div className="flex mt-2">
          <label className="mr-2">Source:</label>
          <select value={importType} onChange={(e) => setImportType(e.target.value)}>
            <option value="chessdotcom">Chess.com</option>
            <option value="lichess">Lichess</option>
          </select>
        </div>
      </div>
    );
}