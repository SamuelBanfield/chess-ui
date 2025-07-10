"use client";

import { useEffect, useState } from "react";
import { FenWithMove } from "../page";

type NoteProps = {
  positionStack: FenWithMove[];
};

export default function Note(props: NoteProps) {

  const { positionStack } = props;
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        params.append('fen', positionStack[positionStack.length - 1].fen);
        const url = `/api/note?${params.toString()}`;
        
        const response = await fetch(url);
        if (response.ok) {
          if (response !== null) {
            const data = await response.json();
            setNote(data.note);
          }
        }
        else {
          console.error('Error:', response);
        }

      } 
      catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [positionStack]);

  const postNote = async (note: string) => {
    try {
      const params = new URLSearchParams();
      params.append('fen', positionStack[positionStack.length - 1].fen);
      params.append('note', note);
      const url = `/api/note?${params.toString()}`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({note}),
      });
      if (response.ok) {
        setNote(note);
      }
      else {
        console.error('Error:', response);
      }
    } 
    catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-3">
      <textarea 
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2 resize-none" 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
        placeholder="Add your note here..."
      />
      <button 
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 font-medium" 
        onClick={() => postNote(note)}
      >
        Save note
      </button>
    </div>
  );
}