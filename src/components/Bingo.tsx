'use client';

import { useState, useEffect } from 'react';
import { BingoTile, bingoTiles } from '../types/bingo';

const Bingo = () => {
    const [selectedTiles, setSelectedTiles] = useState<Set<string>>(new Set());
    const [shuffledTiles, setShuffledTiles] = useState<BingoTile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const shuffleTiles = () => {
        setIsLoading(true);
        setShowConfirmation(false);
        setTimeout(() => {
            const shuffled = [...bingoTiles]
                .sort(() => Math.random() - 0.5)
                .slice(0, 25);
            setShuffledTiles(shuffled);
            setSelectedTiles(new Set());
            localStorage.removeItem('selectedTiles');
            localStorage.removeItem('shuffledTiles');
            setIsLoading(false);
        }, 500);
    };

    const handleNewGameClick = () => {
        setShowConfirmation(true);
    };

    useEffect(() => {
        const savedTiles = localStorage.getItem('selectedTiles');
        const savedBoard = localStorage.getItem('shuffledTiles');
        
        if (savedTiles && savedBoard) {
            setSelectedTiles(new Set(JSON.parse(savedTiles)));
            setShuffledTiles(JSON.parse(savedBoard));
            setIsLoading(false);
        } else {
            shuffleTiles();
        }
    }, []);

    useEffect(() => {
        if (shuffledTiles.length > 0) {
            localStorage.setItem('selectedTiles', JSON.stringify([...selectedTiles]));
            localStorage.setItem('shuffledTiles', JSON.stringify(shuffledTiles));
        }
    }, [selectedTiles, shuffledTiles]);

    const toggleTile = (id: string) => {
        const newSelected = new Set(selectedTiles);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedTiles(newSelected);
    };

    const SkeletonTile = () => (
        <div className="aspect-square p-1 sm:p-2 rounded-lg shadow-lg bg-white/50 animate-pulse flex flex-col items-center justify-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-200 mb-1 sm:mb-2"></div>
            <div className="w-3/4 h-2 sm:h-3 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-2 sm:h-3 bg-gray-200 rounded mt-1"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-2 sm:p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-4 sm:mb-6 text-purple-700 
                    drop-shadow-lg">
                    Party Bingo! 🎉
                </h1>
                
                <div className="w-full">
                    <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-4 mb-4 sm:mb-8">
                        {isLoading ? (
                            Array(25).fill(null).map((_, index) => (
                                <SkeletonTile key={index} />
                            ))
                        ) : (
                            shuffledTiles.map((tile) => (
                                <button
                                    key={tile.id}
                                    onClick={() => toggleTile(tile.id)}
                                    className={`aspect-square p-1 sm:p-2 rounded-lg shadow-lg transition-all duration-300 
                                        ${selectedTiles.has(tile.id)
                                            ? 'bg-purple-600 text-white transform scale-95'
                                            : 'bg-white hover:bg-purple-50 transform hover:scale-105'
                                        } 
                                        flex flex-col items-center justify-center text-center`}
                                >
                                    <div className="flex flex-col items-center justify-center h-full w-full">
                                        <span className="text-[min(4vw,2rem)] sm:text-[min(3vw,2rem)] md:text-[min(2vw,2rem)] mb-1 flex-none">
                                            {tile.icon}
                                        </span>
                                        <span className={`text-[min(1.8vw,0.7rem)] sm:text-[min(1.4vw,0.8rem)] md:text-[min(1vw,0.875rem)] 
                                            font-semibold leading-tight px-0.5 line-clamp-3
                                            ${selectedTiles.has(tile.id)
                                                ? 'text-white'
                                                : 'text-gray-700'
                                            } flex-1 flex items-center`}>
                                            {tile.text}
                                        </span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {!isLoading && (
                    <div className="text-center">
                        <button
                            onClick={handleNewGameClick}
                            className="bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold 
                                shadow-lg hover:bg-purple-700 transition-all duration-300 
                                transform hover:scale-105 text-sm sm:text-base"
                        >
                            New Game 🎲
                        </button>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl transform transition-all">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Start New Game?</h2>
                        <p className="text-gray-600 mb-6">
                            This will reset your current progress. Are you sure you want to start a new game?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={shuffleTiles}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium 
                                    hover:bg-purple-700 transition-colors"
                            >
                                Start New Game
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bingo; 