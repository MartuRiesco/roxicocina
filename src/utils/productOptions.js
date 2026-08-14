import { applyPriceModifier } from './formatters';

const OPTION_KEY_SEPARATOR = '::';

export function getProductOptions(product) {
  return product.options ?? [];
}

export function getDefaultProductOption(product) {
  const options = getProductOptions(product);
  return options.find((option) => option.default) ?? options[0] ?? null;
}

export function getProductOrderKey(product, option = getDefaultProductOption(product)) {
  if (!option || option.default) {
    return product.id;
  }

  return `${product.id}${OPTION_KEY_SEPARATOR}${option.id}`;
}

export function getProductOptionPrice(product, option = getDefaultProductOption(product)) {
  return applyPriceModifier(product.price, option?.priceModifier ?? 0);
}

export function getProductOptionQuantity(quantities, product, option = getDefaultProductOption(product)) {
  return quantities[getProductOrderKey(product, option)] ?? 0;
}

export function getProductTotalQuantity(quantities, product) {
  const options = getProductOptions(product);

  if (options.length === 0) {
    return quantities[product.id] ?? 0;
  }

  return options.reduce(
    (total, option) => total + getProductOptionQuantity(quantities, product, option),
    0,
  );
}

export function getProductCartName(product) {
  return product.selectedOption
    ? `${product.name} (${product.selectedOption.label})`
    : product.name;
}

export function getOrderItems(products, quantities) {
  return products.flatMap((product) => {
    const options = getProductOptions(product);
    const variants = options.length > 0 ? options : [null];

    return variants
      .map((option) => {
        const orderKey = getProductOrderKey(product, option);
        const quantity = quantities[orderKey] ?? 0;

        if (quantity <= 0) {
          return null;
        }

        return {
          product: {
            ...product,
            orderKey,
            selectedOption: option,
            price: getProductOptionPrice(product, option),
          },
          quantity,
        };
      })
      .filter(Boolean);
  });
}
