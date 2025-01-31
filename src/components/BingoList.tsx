'use client';

import { bingoTiles } from '../types/bingo';

const BingoList = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-purple-700 
                    drop-shadow-lg">
                    Party Bingo Tasks 📋
                </h1>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-purple-200">
                                <th className="py-2 px-4 text-left text-purple-700">ID</th>
                                <th className="py-2 px-4 text-left text-purple-700">Icon</th>
                                <th className="py-2 px-4 text-left text-purple-700">Challenge</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bingoTiles.map((tile) => (
                                <tr key={tile.id} className="border-b border-purple-100 hover:bg-purple-50">
                                    <td className="py-3 px-4 text-gray-600 font-mono">{tile.id}</td>
                                    <td className="py-3 px-4 text-2xl">{tile.icon}</td>
                                    <td className="py-3 px-4 text-gray-700">{tile.text}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BingoList; 