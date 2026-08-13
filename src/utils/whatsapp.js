export const WHATSAPP_NUMBER = '5491150978824';
export const WHATSAPP_DISPLAY = '11 5097 8824';

const BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function buildWhatsAppUrl(message) {
  return `${BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function getGeneralOrderUrl() {
  return buildWhatsAppUrl('Hola Roxi Cocina, quiero hacer un pedido de viandas.');
}

export function getProductOrderUrl(product) {
  return buildWhatsAppUrl(
    `Hola Roxi Cocina, quiero pedir: ${product.name}. ¿Me confirmás disponibilidad?`,
  );
}

export function getCartOrderUrl(items) {
  const lines = items.map(({ product, quantity }) => `${quantity}x ${product.name}`);
  const message = [
    'Hola Roxi Cocina, quiero realizar el siguiente pedido:',
    '',
    ...lines.map((line) => `• ${line}`),
    '',
    '¿Me confirmás disponibilidad, horario y coordinación de entrega?',
  ].join('\n');

  return buildWhatsAppUrl(message);
}
