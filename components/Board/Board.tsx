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
  const [winningLine, setWinningLine] = useState<number[] | null>();

  console.log('squares:', squares);

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
    setWinningLine([null, null, null]);
    console.log('WININGLINE:', winningLine);
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
        console.log('Winner:', squares[a]);
        return squares[a];
      }
    }
  };

  const getWinningLine = (squares: Player[]) => {
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
        console.log('Winning Line:', lines[i]);
        return lines[i];
        // setWinningLine(lines[i]);
      }
    }
  };

  const winnerSquares = getWinningLine(squares);

  useEffect(() => {
    const w = calculateWinner(squares);
    console.log('atut', w);
    if (w) {
      setWinner(w);
      // getWinningLine(squares);
    }
    //if there is no winner after ll the squares filled.
    if (!w && !squares.filter(square => !square).length) {
      setWinner('BOTH');
    }
  });

  useEffect(() => {
    setWinningLine(winnerSquares);
  }, [squares]);

  return (
    <BoardWrapper>
      {!winner && <GameInfo>Player {currentPlayer} , its your Turn</GameInfo>}
      {winner && winner !== 'BOTH' && (
        <WinnerMessage>Congratulations!! Player {winner} </WinnerMessage>
      )}
      {winner && winner === 'BOTH' && (
        <BothWinnerMessage>
          Congratulations your both Winner!!{' '}
        </BothWinnerMessage>
      )}
      <GridBoard>
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                squareNumber={i}
                winningLine={winningLine}
                setSquareValue={() => setSquareValue(i)}
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

const BothWinnerMessage = styled.p`
  font-size: 1.2rem;
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
