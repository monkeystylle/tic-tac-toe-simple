import React from 'react';
import styled from 'styled-components';

export type Player = 'X' | 'O' | 'BOTH' | null;

type Props = {
  winner: Player;
  value: Player;
  setSquareValue: () => void;
};

const Square = ({ value, setSquareValue, winner }: Props) => {
  if (!value) {
    return <SquareButton onClick={setSquareValue} disabled={Boolean(winner)} />;
  }

  return <SquareButton>{value}</SquareButton>;
};

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
