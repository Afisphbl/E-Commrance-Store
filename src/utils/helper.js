export const currencyCalculator = (price, discount) => {
  if (!discount) return price;

  const discountedPrice = price - (price * discount) / 100;
  return discountedPrice;
};

export const formatPrice = (price) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
