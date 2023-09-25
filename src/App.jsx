import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import Square from "./components/Square";
import { TURNS, winner_COMBOS } from "./constants/constants";
import ResetButton from "./components/Button";
import checkWinner from "./helpers/checkWinner";
import ModalWindow from "./components/ModalWindow";
import { checkEndGame } from "./helpers/checkEndGame";

const initialBoard = Array(9).fill(null);
const initialTurn = TURNS.X;

export const App = () => {
  
  let finishGame  = null;

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return (boardFromStorage) ? JSON.parse(boardFromStorage) : initialBoard 
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return (turnFromStorage) ? JSON.parse(turnFromStorage) : initialTurn 
  });

  const [winner, setWinner] = useState(null);
  const [ endGame, setEndGame ] = useState(null)

  const handleResetBoard = () => {
    setBoard(initialBoard);
    setTurn(initialTurn);
    setWinner(null);
    setEndGame(null);

    window.localStorage.clear();
  };

  const handleUpdateBoard = (index) => {
    if (board[index]) return;
    if (winner) return;

    // Change the board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Check the if there´s a winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      alert(`We have a winner: "${newWinner}"`);
      confetti();
    }

    setEndGame( checkEndGame(newBoard) );
    
    // Change the turn
    const newTurn = (turn === TURNS.X) ? TURNS.O : TURNS.X
    setTurn(newTurn);

    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn' , JSON.stringify(newTurn));
  };

  finishGame = !winner && endGame

  return (
    <>
      <main className="board">
        <h1>TIC-TAC-TOE</h1>
        <section className="game">
          {board.map((_, index) => (
            <Square key={index} index={index} updateBoard={handleUpdateBoard}>
              {board[index]}
            </Square>
          ))}
        </section>
        <section className="turns">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <ResetButton handleResetBoard={handleResetBoard} />

        {
          winner && <ModalWindow handleResetBoard={handleResetBoard} winner={winner} />
        }   

        {
          finishGame && <ModalWindow handleResetBoard={handleResetBoard} winner={winner} />
        }

      </main>
    </>
  );
};
