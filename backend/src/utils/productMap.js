const productMap = (data) => {
  const product = {
    name: data.name,
    brand: data.brand,
    model: data.model,
  };

  if (Object.keys(data).includes('details')) {
    return {
      product: { ...product, ...data.details },
      details: [{ price: data.price, color: data.details.color }],
    };
  } if (Object.keys(data).includes('data')) {
    return {
      product,
      details: data.data.map((item) => ({ price: item.price, color: item.color })),
    };
  }

  return {
    product,
    details: [{ price: data.price, color: data.color }],
  };
};

module.exports = productMap;
