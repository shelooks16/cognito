import { useEffect, useState } from 'react';
import { getProducts } from './product.service';
import { Product } from './product.types';

export const useProducts = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setError(null);

    try {
      const data = await getProducts({ useMocks: false });
      setData(data);
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    isProductsLoading: data === null && !error,
    products: data,
    productsError: error,
    refetchProducts: refetch,
  };
};
