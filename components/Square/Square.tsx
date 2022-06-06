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
  an: number;
  bn: number;
  cn: number;
}

const Square = ({
  value,
  setSquareValue,
  winner,
  squareNumber,
  winningLine,
}: Props) => {
  const [a, setA] = useState<number>();
  const [b, setB] = useState<number>();
  const [c, setC] = useState<number>();

  useEffect(() => {
    if (winningLine) {
      const [a, b, c] = winningLine;
      setA(a);
      setB(b);
      setC(c);
    }
  }, [winner]);

  if (!value) {
    return <SquareButton onClick={setSquareValue} disabled={Boolean(winner)} />;
  }

  return (
    <SquareButton>
      <AnimateWrapper an={a} bn={b} cn={c} squareNumber={squareNumber} atut={6}>
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
  animation: ${({ squareNumber, an, bn, cn }) =>
    squareNumber === an || squareNumber === bn || squareNumber === cn
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
    background-color: #f3f3f3;
    cursor: revert;
  }
`;

export default Square;
