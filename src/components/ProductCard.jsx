import { formatPrice } from '../utils/formatters';
import { getProductOrderUrl } from '../utils/whatsapp';

const PLACEHOLDER = '/images/products/placeholder-roxi.svg';

export default function ProductCard({ product, index, quantity, onAdd }) {
  const visibleTags = product.tags.slice(0, 3);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image}
          alt={`${product.name} de Roxi Cocina`}
          width="640"
          height="480"
          loading={index < 3 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = PLACEHOLDER;
          }}
        />
        <span className="category-badge">{product.category}</span>
        {quantity > 0 && <span className="selected-badge">En tu pedido · {quantity}</span>}
      </div>

      <div className="product-body">
        <div className="product-heading">
          <div>
            <p className="product-protein">{product.protein === 'Sin especificar' ? 'Preparación casera' : product.protein}</p>
            <h3>{product.name}</h3>
          </div>
          <strong className="product-price">{formatPrice(product.price)}</strong>
        </div>

        <p className="product-detail">{product.detail}</p>

        <div className="tag-list" aria-label="Etiquetas del producto">
          {visibleTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <div className="product-actions">
          <button className="button product-add" type="button" onClick={() => onAdd(product.id)}>
            {quantity > 0 ? 'Agregar otro' : 'Agregar a mi pedido'}
          </button>
          <a className="text-link" href={getProductOrderUrl(product)} target="_blank" rel="noreferrer">
            Pedir este producto por WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
