import { getGeneralOrderUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#inicio">
            <span className="brand-mark" aria-hidden="true">R</span>
            <span className="brand-copy">
              <strong>Roxi Cocina</strong>
              <small>Comida casera que abraza</small>
            </span>
          </a>
          <p className="footer-copy">Viandas y productos caseros para resolver rico, fácil y con sabor a hecho en casa.</p>
        </div>

        <div className="footer-links">
          <strong>Recorré</strong>
          <a href="#catalogo">Viandas</a>
          <a href="#como-pedir">Cómo pedir</a>
          <a href="https://www.instagram.com/roxi.cocina/" target="_blank" rel="noreferrer">@roxi.cocina</a>
        </div>

        <div className="footer-links">
          <strong>Pedidos</strong>
          <a href={getGeneralOrderUrl()} target="_blank" rel="noreferrer">WhatsApp: {WHATSAPP_DISPLAY}</a>
          <span>Confirmamos disponibilidad y entrega por mensaje.</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© Roxi Cocina. Comida casera hecha con amor.</span>
        <a href="#inicio">Volver arriba ↑</a>
      </div>
    </footer>
  );
}
