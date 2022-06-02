import React from 'react';
import styled from 'styled-components';

export type Player = 'X' | 'O' | 'BOTH' | null;

type Props = {
  winner: Player;
  value: Player;
  onClick: () => void;
};

const Square = ({ value, onClick, winner }: Props) => {
  if (!value) {
    return <SquareButton onClick={onClick} disabled={Boolean(winner)} />;
  }

  return <SquareButton disabled>{value}</SquareButton>;
};

const SquareButton = styled.button`
  cursor: pointer;

  font-size: 4rem;
`;

export default Square;
