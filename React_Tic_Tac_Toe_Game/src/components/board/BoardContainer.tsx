import Boardtable from "./BoardTable";
import { useState } from "react";

const initialState = [
  { id: 1, symbol: "" },
  { id: 2, symbol: "" },
  { id: 3, symbol: "" },
  { id: 4, symbol: "" },
  { id: 5, symbol: "" },
  { id: 6, symbol: "" },
  { id: 7, symbol: "" },
  { id: 8, symbol: "" },
  { id: 9, symbol: "" },
];
const winPattern = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function BoardContainer() {
  const [symbol, setSymbol] = useState("X");
  const [board, setBoard] = useState(initialState);

  function toggleSymbol() { 
    setSymbol(prev => (prev === 'X' ? 'O': 'X'))
  }

  function tieChecking(updatedBoard) {
    if (updatedBoard.every((item) => item.symbol !== "")) {
      return true;
    }
    return false;
  }

  function winCheck(updatedBoard) {
    for (let pattern of winPattern) {
      const [a, b, c] = pattern;

      const firstItem = updatedBoard.find((item) => item.id === a);
      const secondItem = updatedBoard.find((item) => item.id === b);
      const thirdItem = updatedBoard.find((item) => item.id === c);

      if (
        firstItem?.symbol &&
        firstItem.symbol === secondItem?.symbol &&
        firstItem.symbol === thirdItem?.symbol
      ) {
        alert(`Player ${firstItem.symbol} wins!`);
        return true;
      }
    }
    return false;
  }

  function updateBoard(id) {
    
    const updatedBoard = board.map((item) => {
      if (item.id === id && item.symbol === "") {
        // bank is checking if user try to add symbol in an exiting symbol.
        const updatedItem = { ...item, symbol: symbol }
        return updatedItem;
      }
      
      return item;
    });

    setBoard(updatedBoard);

    if (!winCheck(updatedBoard)) {
        if(!tieChecking(updatedBoard)){
            toggleSymbol()
        }
    }
  }

  function onClickHandler(e, id) {
    updateBoard(id);
  }

  return (
    <div>
      <Boardtable
        onClickHandler={onClickHandler}
        symbol={symbol}
        board={board}
      />
    </div>
  );
}

export default BoardContainer;
