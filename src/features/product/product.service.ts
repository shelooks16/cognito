import { waitSome } from '../../utils/waitSome';
import { Product } from './product.types';

const mockProducts: Product[] = [
  { id: 1, name: 'Product1', description: 'Okie dokie', price: 3.99 },
  { id: 2, name: 'Product2', description: 'Boogie woogie', price: 1.79 },
  { id: 3, name: 'Product3', description: 'Kitty meow', price: 5.99 },
];
const productsUrl =
  'https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/products.json';

type GetProductsParams = {
  useMocks?: boolean;
};

export const getProducts = async (
  params: GetProductsParams = {}
): Promise<Product[]> => {
  const { useMocks = true } = params;

  if (useMocks) {
    await waitSome(500);
    return mockProducts;
  }

  const data = await fetch(productsUrl).then(r => r.json());

  return data as Product[];
};
