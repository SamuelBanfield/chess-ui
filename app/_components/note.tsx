"use client";

import { useEffect, useState } from "react";

type NoteProps = {
  positionStack: string[];
};

export default function Note(props: NoteProps) {

  const { positionStack } = props;
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        params.append('fen', positionStack[positionStack.length - 1]);
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
      params.append('fen', positionStack[positionStack.length - 1]);
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
    <div className="">
      <textarea className="w-full border border-2 resize-none" value={note} onChange={(e) => setNote(e.target.value)} />
      <button className="px-2 bg-blue-500 text-white" onClick={() => postNote(note)}>Save note</button>
    </div>
  );
}