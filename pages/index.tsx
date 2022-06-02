import styled from 'styled-components';
import type { NextPage } from 'next';
import Board from '../components/Board';

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <Title>Tic Tac Toe</Title>
      <Board />
    </PageWrapper>
  );
};

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Home;
