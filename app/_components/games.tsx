"use client";

import { useEffect, useState } from "react";

export default function Games({ game }) {

  const [games, setGames] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/games/chessdotcom/wertsy10');
        const data = await response.json();
        console.log(data); // Process the fetched data here
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Games</h1>
    </div>
  );
}