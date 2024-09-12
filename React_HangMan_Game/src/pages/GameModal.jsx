// GameOverModal.js
import React from "react";

function GameModal({ onRestart }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow-lg text-center">
                <h2 className="text-2xl mb-4">Game Over!</h2>
                <p className="mb-4">Would you like to start a new game?</p>
                <button 
                    onClick={onRestart} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Start Again
                </button>
            </div>
        </div>
    );
}

export default GameModal;
