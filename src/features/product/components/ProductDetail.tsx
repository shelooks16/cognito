import styled from 'styled-components';
import { formatMoney } from '../../../utils/format';
import { useBasketDispatch } from '../../basket/useBasket';
import { Product } from '../product.types';
import { useState } from 'react';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 100%;
`;

const StyledContent = styled.div`
  flex: 1;
  padding: 10px;
`;

const StyledName = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
`;

const StyledPrice = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.mainDark};
  font-weight: 600;
`;

const StyledProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

const StyledProductDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondaryDark};
`;

const StyledAddMeBtn = styled.button`
  border: none;
  width: 100%;
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;

  font-size: 12px;
  font-weight: 600;

  &:hover {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.mainDark};
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const useAdded = (timeoutMs = 1000) => {
  const [wasAdded, setWasAdded] = useState(false);

  const add = () => {
    setWasAdded(true);

    setTimeout(() => {
      setWasAdded(false);
    }, timeoutMs);
  };

  return {
    wasAdded,
    add,
  };
};

type ProductDetailProps = {
  product: Product;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const basketDispatch = useBasketDispatch();
  const { add, wasAdded } = useAdded();

  const handleAddMe = () => {
    basketDispatch({
      type: 'ADD_PRODUCT',
      product,
    });
    add();
  };

  return (
    <StyledWrapper>
      <StyledContent>
        <StyledProductHeader>
          <StyledName>{product.name}</StyledName>
          <StyledPrice>{formatMoney(product.price)}</StyledPrice>
        </StyledProductHeader>

        <StyledProductDescription>
          {product.description}
        </StyledProductDescription>
      </StyledContent>

      <StyledAddMeBtn disabled={wasAdded} type="button" onClick={handleAddMe}>
        {wasAdded ? 'Added' : 'Add to basket'}
      </StyledAddMeBtn>
    </StyledWrapper>
  );
};

export default ProductDetail;
