import styled from 'styled-components';
import { getBasketTotal, useBasket, useBasketDispatch } from '../useBasket';
import { Product } from '../../product/product.types';
import { formatMoney } from '../../../utils/format';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  & td,
  & th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  & tr:nth-child(even) {
    background-color: #ebebeb;
  }

  & th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: ${({ theme }) => theme.colors.mainDark};
    color: white;
  }
`;

const StyledActionSection = styled.div`
  white-space: nowrap;
`;

const StyledActionButton = styled.button<{ $size?: 'sm' | 'md' }>`
  border: none;
  background-color: ${({ theme }) => theme.colors.mainDark};
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  padding: ${props => (props.$size === 'sm' ? '4px 8px' : '5px 10px')};
  font-size: ${props => (props.$size === 'sm' ? '14px' : '16px')};
`;

const StyledTotalSection = styled.div`
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 10px;

  position: sticky;
  bottom: 0px;
  background: #fff;
  border-top: 1px solid #ddd;
`;

const StyledRemoveSection = styled.div`
  margin-top: 10px;
`;

const StyledQuantityValue = styled.span`
  display: inline-block;
  text-align: center;
  margin: 0px 10px;
  width: 40px;
`;

const Basket = () => {
  const basket = useBasket();
  const basketDispatch = useBasketDispatch();
  const totalBasketPrice = getBasketTotal(basket);

  const handleIncreaseQty = (product: Product) => {
    basketDispatch({
      type: 'ADD_PRODUCT',
      product,
    });
  };

  const handleDecreaseQty = (product: Product) => {
    basketDispatch({
      type: 'REMOVE_PRODUCT_ONCE',
      productId: product.id,
    });
  };

  const handleRemoveFromBasket = (product: Product) => {
    basketDispatch({
      type: 'REMOVE_PRODUCT',
      productId: product.id,
    });
  };

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {basket.map(item => (
            <tr key={item.id}>
              <td>
                <div>{item.product.name}</div>
                <div>
                  <small>{formatMoney(item.product.price)}</small>
                </div>
                <small>{item.product.description}</small>
                <StyledRemoveSection>
                  <StyledActionButton
                    type="button"
                    onClick={() => handleRemoveFromBasket(item.product)}
                    $size="sm"
                  >
                    Remove
                  </StyledActionButton>
                </StyledRemoveSection>
              </td>
              <td>
                <StyledActionSection>
                  <StyledActionButton
                    type="button"
                    onClick={() => handleDecreaseQty(item.product)}
                  >
                    -
                  </StyledActionButton>
                  <StyledQuantityValue>
                    <b>{item.quantity}</b>
                  </StyledQuantityValue>
                  <StyledActionButton
                    type="button"
                    onClick={() => handleIncreaseQty(item.product)}
                  >
                    +
                  </StyledActionButton>
                </StyledActionSection>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <StyledTotalSection>
        <div>Total {formatMoney(totalBasketPrice)}</div>
      </StyledTotalSection>
    </div>
  );
};

export default Basket;
