import { getGeneralOrderUrl } from '../utils/whatsapp';

export default function WhatsAppButton({ elevated = false }) {
  return (
    <a
      className={`whatsapp-float ${elevated ? 'is-elevated' : ''}`}
      href={getGeneralOrderUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Hacer pedido por WhatsApp"
    >
      <span aria-hidden="true">↗</span>
      <span className="whatsapp-float-label">WhatsApp</span>
    </a>
  );
}
