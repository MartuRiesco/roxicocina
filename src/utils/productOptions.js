import { applyPriceModifier, normalizeSearch } from './formatters';

const OPTION_KEY_SEPARATOR = '::';

export function getProductOptions(product) {
  return product.options ?? [];
}

export function getProductOptionName(option) {
  const name = (option?.title ?? option?.label ?? '').replace(/^con\s+/i, '').trim();

  return name ? `${name[0].toLocaleUpperCase('es-AR')}${name.slice(1)}` : '';
}

export function getProductOptionSummary(product, separator = ' / ') {
  return getProductOptions(product)
    .map((option) => getProductOptionName(option))
    .filter(Boolean)
    .join(separator);
}

export function getDefaultProductOption(product) {
  const options = getProductOptions(product);
  return options.find((option) => option.default) ?? options[0] ?? null;
}

export function getProductDisplayName(product) {
  const optionSummary = getProductOptionSummary(product, '/');

  if (!optionSummary) {
    return product.name;
  }

  return replaceDefaultOptionPrefix(product, optionSummary);
}

export function getProductVariantName(product, option = getDefaultProductOption(product)) {
  const optionName = getProductOptionName(option);

  if (!optionName) {
    return getProductDisplayName(product);
  }

  return replaceDefaultOptionPrefix(product, optionName);
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
    ? `${getProductVariantName(product, product.selectedOption)} (${product.selectedOption.label})`
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

function replaceDefaultOptionPrefix(product, replacement) {
  const defaultOptionName = getProductOptionName(getDefaultProductOption(product));

  if (!defaultOptionName) {
    return product.name;
  }

  const currentPrefix = product.name.slice(0, defaultOptionName.length);

  if (normalizeSearch(currentPrefix) !== normalizeSearch(defaultOptionName)) {
    return `${replacement} ${product.name}`;
  }

  return `${replacement}${product.name.slice(defaultOptionName.length)}`;
}
