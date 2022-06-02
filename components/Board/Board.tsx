import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Square from '../Square';
import { Player } from '../Square/Square';

type Props = {};

const Board = (props: Props) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
    Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
  );
  const [winner, setWinner] = useState<Player>(null);

  const setSquareValue = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      } else {
        return val;
      }
    });

    setSquares(newData);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleReset = params => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
  };

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
  };

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }
    //if there is no winner after ll the squares filled.
    if (!w && !squares.filter(square => !square).length) {
      setWinner('BOTH');
    }
  });

  return (
    <BoardWrapper>
      {!winner && <GameInfo>Player {currentPlayer} , its your Turn</GameInfo>}
      {winner && winner !== 'BOTH' && (
        <WinnerMessage>Congratulations!! Player {winner} </WinnerMessage>
      )}
      {winner && winner === 'BOTH' && (
        <WinnerMessage>Congratulations your both Winner!! </WinnerMessage>
      )}
      <GridBoard>
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
              />
            );
          })}
      </GridBoard>
      <ResetButton onClick={handleReset}>Reset</ResetButton>
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div`
  /* background: lightgray;
  width: fit-content;
  padding: 16px;
  border-radius: 8px; */
`;

const WinnerMessage = styled.p`
  font-size: 1.4rem;
  margin-bottom: 4px;
`;

const GameInfo = styled.p`
  font-size: 1.4rem;
  margin-bottom: 4px;
`;

const GridBoard = styled.div`
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: 100px 100px 100px;
`;

const ResetButton = styled.button`
  margin-top: 16px;
  font-size: 1.4rem;
`;

export default Board;
