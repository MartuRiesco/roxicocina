import { getGeneralOrderUrl } from '../utils/whatsapp';

export default function Hero() {
  return (
    <main id="inicio">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Viandas caseras · hechas con amor</p>
            <h1 id="hero-title">Comida casera que abraza</h1>
            <p className="hero-lead">
              Viandas caseras, platos para tener listos, tartas, empanadas y mucho más.
              Elegí lo que más te gusta y coordinamos todo por WhatsApp.
            </p>
            <div className="hero-actions">
              <a className="button" href="#catalogo">Ver viandas</a>
              <a className="button button-secondary" href={getGeneralOrderUrl()} target="_blank" rel="noreferrer">
                Hacer pedido por WhatsApp
              </a>
            </div>
            <ul className="hero-notes" aria-label="Características de Roxi Cocina">
              <li>Casero</li>
              <li>Práctico</li>
              <li>Listo para disfrutar</li>
            </ul>
          </div>

          <div className="hero-card" aria-label="Propuesta de Roxi Cocina">
            <span className="hero-card-kicker">Para tu semana</span>
            <strong>Elegí, combiná y armá tu pedido a tu manera.</strong>
            <p>Opciones individuales, dobles, para horno, freezer y algo dulce para cerrar.</p>
            <a href="#como-pedir">Ver cómo pedir <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
