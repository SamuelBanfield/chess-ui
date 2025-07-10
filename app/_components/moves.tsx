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
        <div className="p-3 h-[90vh] bg-white rounded-lg shadow-lg flex flex-col">
            <div className="flex-1 overflow-y-auto border border-gray-200 rounded-md">
            { Array.from({ length: Math.ceil(moves.length / 2) }, (_, i) => {
                const moveIndex = i * 2;
                const whiteMove = moves[moveIndex] ? moves[moveIndex].move : "";
                const blackMove = moves[moveIndex + 1] ? moves[moveIndex + 1].move : "";
                
                return (
                <div key={moveIndex} className="grid grid-cols-7 w-full border-b border-gray-200 hover:bg-gray-50">
                    <div className="py-2 px-3 col-span-1 text-center bg-gray-100 text-gray-700 border-r border-gray-200">
                    <span className="text-sm font-medium">{i + 1}.</span>
                    </div>
                    <div className="py-2 px-3 col-span-3 bg-white text-gray-800 text-center border-r border-gray-200">
                    <span className="text-sm font-mono">{whiteMove}</span>
                    </div>
                    <div className="py-2 px-3 col-span-3 bg-gray-600 text-white text-center">
                    <span className="text-sm font-mono">{blackMove}</span>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
    );
}
