export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(number / 100);
};

export const getUniqueValues = () => {};
