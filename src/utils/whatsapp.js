import { getProductCartName, getProductVariantName } from './productOptions';

export const WHATSAPP_NUMBER = '5491150978824';
export const WHATSAPP_DISPLAY = '11 5097 8824';

const BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function buildWhatsAppUrl(message) {
  return `${BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function getGeneralOrderUrl() {
  return buildWhatsAppUrl('Hola Roxi Cocina, quiero hacer un pedido de viandas.');
}

export function getProductOrderUrl(product, option = null) {
  const productName = option ? `${getProductVariantName(product, option)} (${option.label})` : product.name;

  return buildWhatsAppUrl(
    `Hola Roxi Cocina, quiero pedir: ${productName}. ¿Me confirmás disponibilidad?`,
  );
}

export function getCartOrderUrl(items) {
  const lines = items.map(({ product, quantity }) => `${quantity}x ${getProductCartName(product)}`);
  const message = [
    'Hola Roxi Cocina, quiero realizar el siguiente pedido:',
    '',
    ...lines.map((line) => `• ${line}`),
    '',
    '¿Me confirmás disponibilidad, horario y coordinación de entrega?',
  ].join('\n');

  return buildWhatsAppUrl(message);
}
