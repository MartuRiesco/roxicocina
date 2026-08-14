const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  const prices = getPriceValues(value);

  if (prices.length === 0) {
    return 'Precio a consultar';
  }

  return prices.map((price) => currencyFormatter.format(price)).join(' / ');
}

export function applyPriceModifier(value, modifier = 0) {
  const adjustment = Number.isFinite(modifier) ? modifier : 0;

  if (Array.isArray(value)) {
    return value.map((price) => (Number.isFinite(price) ? price + adjustment : price));
  }

  if (
    value
    && typeof value === 'object'
    && Number.isFinite(value.min)
    && Number.isFinite(value.max)
  ) {
    return {
      min: value.min + adjustment,
      max: value.max + adjustment,
    };
  }

  return Number.isFinite(value) ? value + adjustment : value;
}

export function formatPriceRange(value) {
  const range = getPriceRange(value);

  if (!range) {
    return 'Precio a consultar';
  }

  if (range.min === range.max) {
    return currencyFormatter.format(range.min);
  }

  return `${currencyFormatter.format(range.min)} - ${currencyFormatter.format(range.max)}`;
}

export function getPriceRange(value) {
  if (
    value
    && typeof value === 'object'
    && !Array.isArray(value)
    && Number.isFinite(value.min)
    && Number.isFinite(value.max)
  ) {
    return value;
  }

  const prices = getPriceValues(value);

  if (prices.length === 0) {
    return null;
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function getLinePriceRange(price, quantity) {
  const range = getPriceRange(price);

  if (!range) {
    return null;
  }

  return {
    min: range.min * quantity,
    max: range.max * quantity,
  };
}

export function getOrderPriceRange(items) {
  return items.reduce((subtotal, { product, quantity }) => {
    const lineRange = getLinePriceRange(product.price, quantity);

    if (!lineRange) {
      return subtotal;
    }

    return {
      min: subtotal.min + lineRange.min,
      max: subtotal.max + lineRange.max,
    };
  }, { min: 0, max: 0 });
}

function getPriceValues(value) {
  const values = Array.isArray(value) ? value : [value];

  return [...new Set(values.filter((price) => Number.isFinite(price)))];
}

export function normalizeSearch(value = '') {
  return value
    .toLocaleLowerCase('es-AR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}
