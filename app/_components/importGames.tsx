"use client";

import React, { useState } from 'react';

export default function ImportGames() {
  const [inputText, setInputText] = useState('');

  const importGames = async () => {
    try {
      const response = await fetch(`/api/games/chessdotcom/${inputText}/import`, {
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
          <input type="text" name="file" value={inputText} onChange={(e) => setInputText(e.target.value)} className="mr-2 px-2 py-1 border border-gray-300 rounded" />
          <button onClick={importGames} className="px-2 py-2 bg-blue-500 text-white rounded">Import</button>
        </div>
      </div>
    );
}