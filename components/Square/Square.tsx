import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

export type Player = 'X' | 'O' | 'BOTH' | null;

type Props = {
  winner: Player;
  value: Player;
  setSquareValue: () => void;
  squareNumber: number;
  winningLine: number[] | null;
};

interface IsquareButton {
  atut?: number;
  color?: string;
  squareNumber: number;
  winningSquare1: number;
  winningSquare2: number;
  winningSquare3: number;
}

const Square = ({
  value,
  setSquareValue,
  winner,
  squareNumber,
  winningLine,
}: Props) => {
  const [winningSquare1, setWinningSquare1] = useState<number>();
  const [winningSquare2, setWinningSquare2] = useState<number>();
  const [winningSquare3, setWinningSquare3] = useState<number>();

  useEffect(() => {
    if (winningLine) {
      const [a, b, c] = winningLine;
      setWinningSquare1(a);
      setWinningSquare2(b);
      setWinningSquare3(c);
    }
  }, [winner]);

  if (!value) {
    return <SquareButton onClick={setSquareValue} disabled={Boolean(winner)} />;
  }

  return (
    <SquareButton>
      <AnimateWrapper
        winningSquare1={winningSquare1}
        winningSquare2={winningSquare2}
        winningSquare3={winningSquare3}
        squareNumber={squareNumber}
      >
        {value}
      </AnimateWrapper>
    </SquareButton>
  );
};

const blink = keyframes`
 from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
`;

const AnimateWrapper = styled.span<IsquareButton>`
  animation: ${({
    squareNumber,
    winningSquare1,
    winningSquare2,
    winningSquare3,
  }) =>
    squareNumber === winningSquare1 ||
    squareNumber === winningSquare2 ||
    squareNumber === winningSquare3
      ? css`
          ${blink} 1000ms infinite
        `
      : 'none'};
`;

const SquareButton = styled.button`
  cursor: pointer;

  font-size: 4rem;
  border: none;
  color: #a6a6a6;

  &:disabled {
    background-color: #f0f0f0;
    cursor: revert;
  }
`;

export default Square;
