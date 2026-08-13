import { getGeneralOrderUrl } from '../utils/whatsapp';

export default function Header({ orderCount, onOpenOrder }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="Roxi Cocina, ir al inicio">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span className="brand-copy">
            <strong>Roxi Cocina</strong>
            <small>Hecho en casa</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#catalogo">Viandas</a>
          <a href="#como-pedir">Cómo pedir</a>
          <a href="https://www.instagram.com/roxi.cocina/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </nav>

        <div className="header-actions">
          <button className="order-counter" type="button" onClick={onOpenOrder} aria-label={`Abrir mi pedido. ${orderCount} productos seleccionados`}>
            <span>Mi pedido</span>
            <strong>{orderCount}</strong>
          </button>
          <a className="button button-small header-whatsapp" href={getGeneralOrderUrl()} target="_blank" rel="noreferrer">
            Hacer pedido
          </a>
        </div>
      </div>
    </header>
  );
}
