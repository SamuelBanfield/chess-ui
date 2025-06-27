"use client";

import { FenWithMove } from "../page";

type MovesProps = {
    positionStack: FenWithMove[];
    setPositionStack: (positionStack: FenWithMove[]) => void;
};

export default function Moves({ positionStack }: MovesProps) {
    // Create a list of moves without the initial position
    const moves = positionStack.slice(1);

    return (
        <div className="" >
            <div className="flex flex-col h-[640px] overflow-y-auto border border-gray-200 rounded">
                { Array.from({ length: Math.ceil(moves.length / 2) }, (_, i) => {
                    const moveIndex = i * 2;
                    const whiteMove = moves[moveIndex] ? moves[moveIndex].move : "";
                    const blackMove = moves[moveIndex + 1] ? moves[moveIndex + 1].move : "";
                    
                    return (
                        <div key={moveIndex} className="grid grid-cols-7 w-full">
                            <div className="py-1 col-span-1 text-center bg-gray-200 text-black">
                                <span className="font-mono">{i + 1}.</span>
                            </div>
                            <div className="py-1 col-span-3 bg-white text-gray-800 text-center">
                                <span className="font-mono">{whiteMove}</span>
                            </div>
                            <div className="py-1 col-span-3 bg-gray-600 text-white text-center">
                                <span className="font-mono">{blackMove}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
