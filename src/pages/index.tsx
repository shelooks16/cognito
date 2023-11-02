import styled from 'styled-components';
import ProductList from '../features/product/components/ProductList';

const StyledHomeTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 40px;
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mainDark};

  @media ${({ theme }) => theme.media.md} {
    font-size: 1.75rem;
  }
`;

const HomePage = () => {
  return (
    <div>
      <StyledHomeTitle>See available products below</StyledHomeTitle>
      <ProductList />
    </div>
  );
};

export default HomePage;
