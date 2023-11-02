import styled from 'styled-components';
import { useProducts } from '../useProducts';
import ProductDetail from './ProductDetail';

const StyledList = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const StyledProductsLoader = styled.div`
  text-align: center;
`;

const StyledErrorMessage = styled.div`
  text-align: center;

  div + div {
    color: #d31616;
    font-size: 1.5rem;
    margin-top: 10px;
  }
`;

const ProductList = () => {
  const { products, productsError, isProductsLoading } = useProducts();

  if (isProductsLoading) {
    return <StyledProductsLoader>Loading products...</StyledProductsLoader>;
  }

  if (productsError) {
    return (
      <StyledErrorMessage>
        <div>Failed to fetch products</div>
        <div>{productsError.message}</div>
      </StyledErrorMessage>
    );
  }

  if (!products) return null;

  return (
    <StyledList>
      {products.map(p => (
        <ProductDetail key={p.id} product={p} />
      ))}
    </StyledList>
  );
};

export default ProductList;
