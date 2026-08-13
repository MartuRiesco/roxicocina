import { getGeneralOrderUrl } from '../utils/whatsapp';

const steps = [
  {
    number: '01',
    title: 'Elegí tus viandas',
    text: 'Recorré el catálogo, buscá por ingrediente y combiná los filtros para encontrar lo que te gusta.',
  },
  {
    number: '02',
    title: 'Armá tu pedido',
    text: 'Sumá uno o varios productos a Mi pedido y ajustá las cantidades antes de enviarlo.',
  },
  {
    number: '03',
    title: 'Escribinos por WhatsApp',
    text: 'Se abre el pedido listo para enviar. Ahí confirmamos disponibilidad, horario y coordinación de entrega.',
  },
];

export default function HowToOrder() {
  return (
    <section className="how-section" id="como-pedir" aria-labelledby="how-title">
      <div className="container">
        <div className="section-heading how-heading">
          <div>
            <p className="eyebrow">Cómo pedir</p>
            <h2 id="how-title">Tu pedido, en simples pasos</h2>
          </div>
          <p>Sin registros, sin checkout y sin vueltas. Elegís lo que querés y terminamos de coordinar de persona a persona.</p>
        </div>

        <ol className="steps-grid">
          {steps.map((step) => (
            <li className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="how-cta">
          <div>
            <strong>¿Ya sabés qué querés?</strong>
            <span>Escribinos y coordinamos tu pedido.</span>
          </div>
          <a className="button button-light" href={getGeneralOrderUrl()} target="_blank" rel="noreferrer">Hablar por WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
