'use client';

import { useState, useEffect } from 'react';
import { BingoTile, bingoTiles } from '../types/bingo';

const Bingo = () => {
    const [selectedTiles, setSelectedTiles] = useState<Set<string>>(new Set());
    const [shuffledTiles, setShuffledTiles] = useState<BingoTile[]>([]);

    const shuffleTiles = () => {
        const shuffled = [...bingoTiles]
            .sort(() => Math.random() - 0.5)
            .slice(0, 25);
        setShuffledTiles(shuffled);
        setSelectedTiles(new Set());
        // Clear localStorage when starting a new game
        localStorage.removeItem('selectedTiles');
        localStorage.removeItem('shuffledTiles');
    };

    useEffect(() => {
        // Load state from localStorage
        const savedTiles = localStorage.getItem('selectedTiles');
        const savedBoard = localStorage.getItem('shuffledTiles');
        
        if (savedTiles && savedBoard) {
            setSelectedTiles(new Set(JSON.parse(savedTiles)));
            setShuffledTiles(JSON.parse(savedBoard));
        } else {
            shuffleTiles();
        }
    }, []);

    useEffect(() => {
        // Only save to localStorage if we have tiles (don't save initial empty state)
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-purple-700 
                    drop-shadow-lg">
                    Party Bingo! 🎉
                </h1>
                
                <div className="grid grid-cols-5 gap-2 md:gap-4 mb-8">
                    {shuffledTiles.map((tile) => (
                        <button
                            key={tile.id}
                            onClick={() => toggleTile(tile.id)}
                            className={`aspect-square p-2 rounded-lg shadow-lg transition-all duration-300 
                                ${selectedTiles.has(tile.id)
                                    ? 'bg-purple-600 text-white transform scale-95'
                                    : 'bg-white hover:bg-purple-50 transform hover:scale-105'
                                } 
                                flex flex-col items-center justify-center text-center`}
                        >
                            <span className="text-2xl md:text-4xl mb-2">{tile.icon}</span>
                            <span className={`text-xs md:text-sm font-semibold leading-tight
                                ${selectedTiles.has(tile.id)
                                    ? 'text-white'
                                    : 'text-gray-700'
                                }`}>
                                {tile.text}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={shuffleTiles}
                        className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold 
                            shadow-lg hover:bg-purple-700 transition-all duration-300 
                            transform hover:scale-105"
                    >
                        New Game 🎲
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Bingo; 