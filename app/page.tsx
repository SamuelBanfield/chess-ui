import Image from "next/image";

export default function Home() {

  const board = [
    "bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR",
    "bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP",
    "wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"
  ];


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="grid grid-cols-8">
          {board.map((piece, index: number) => (
            <div
              key={index}
              className={`${(Math.floor(index / 8) + index) % 2 === 0 ? "bg-white" : "bg-gray"} piece ${piece ? "" : "empty-square"}`}
              style={{ width: "60px", height: "60px" }}
            >
              {piece && <Image src={`/pieces/${piece}.svg`} alt={piece} width={60} height={60} />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
