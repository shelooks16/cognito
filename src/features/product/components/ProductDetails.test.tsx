import { describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetail from './ProductDetail';
import { Product } from '../product.types';
import { GlobalThemeProvider } from '../../../theme';
import { formatMoney } from '../../../utils/format';
import { BasketCtxProvider } from '../../basket/useBasket';

const mockProduct: Product = {
  id: 1235,
  name: 'NAMAE',
  description: 'DESC',
  price: 17.63,
};

const renderMockProduct = () =>
  render(
    <GlobalThemeProvider>
      <BasketCtxProvider>
        <ProductDetail product={mockProduct} />
      </BasketCtxProvider>
    </GlobalThemeProvider>
  );

const getAddToBasketBtn = () =>
  screen.findByTestId('product-add-to-basket-btn');

describe('ProductDetail', () => {
  test('Product price is formatted', async () => {
    renderMockProduct();

    expect((await screen.findByTestId('product-money')).textContent).toBe(
      formatMoney(mockProduct.price)
    );
  });

  test(`"Add to basket" button text changes when clicked`, async () => {
    renderMockProduct();

    expect((await getAddToBasketBtn()).textContent).toBe('Add to basket');

    await userEvent.click(await getAddToBasketBtn());

    expect((await getAddToBasketBtn()).textContent).toBe('Added');

    await waitFor(
      async () =>
        expect((await getAddToBasketBtn()).textContent).toBe('Add to basket'),
      { timeout: 3000 }
    );
  });
});
