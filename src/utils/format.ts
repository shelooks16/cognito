const cacheByCurrency: Record<string, Intl.NumberFormat> = {};

const getMoneyFormatter = (currency: string) => {
  const formatter =
    cacheByCurrency[currency] ??
    new Intl.NumberFormat('en-gb', { style: 'currency', currency: currency });

  cacheByCurrency[currency] = formatter;

  return formatter;
};

export const formatMoney = (value: number, currency = 'GBP') => {
  return getMoneyFormatter(currency).format(value);
};
