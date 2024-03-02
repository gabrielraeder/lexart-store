const productMap = (data) => {
  if (Object.keys(data).includes('details')) {
    return {
      product: {
        name: data.name,
        brand: data.details.brand,
        model: data.details.model
      },
      details: [
        {
          price: data.price,
          color: data.details.color
        }
      ]
    }
  } else if (Object.keys(data).includes('data')) {
    return {
      product: {
        name: data.name,
        brand: data.brand,
        model: data.model
      },
      details: data.data.map((item) => ({ price: item.price, color: item.color }))
    }
  }
  return {
    product: {
      name: data.name,
      brand: data.brand,
      model: data.model
    },
    details: [
      {
        price: data.price,
        color: data.color
      }
    ]
  }
}

module.exports = productMap;
