export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(number / 100);
};

export const getUniqueValues = (arr, field) => {
  let uniqueValue = arr.map((item) => item[field]);
  if (field === 'colors') {
    uniqueValue = uniqueValue.flat();
  }
  uniqueValue = ['all', ...new Set(uniqueValue)];
  return uniqueValue;
};
