import { useState } from 'react';
import { formatPrice } from '../utils/formatters';
import {
  getDefaultProductOption,
  getProductDisplayName,
  getProductOptionSummary,
  getProductOptionPrice,
  getProductOptionQuantity,
  getProductOptions,
  getProductOrderKey,
  getProductTotalQuantity,
} from '../utils/productOptions';
import { getProductOrderUrl } from '../utils/whatsapp';

const PLACEHOLDER = '/images/products/placeholder-roxi.svg';

export default function ProductCard({ product, index, quantities = {}, onAdd }) {
  const visibleTags = product.tags.slice(0, 3);
  const options = getProductOptions(product);
  const defaultOption = getDefaultProductOption(product);
  const [selectedOptionId, setSelectedOptionId] = useState(defaultOption?.id ?? '');
  const selectedOption = options.find((option) => option.id === selectedOptionId) ?? defaultOption;
  const displayName = getProductDisplayName(product);
  const proteinLabel = options.length > 0
    ? getProductOptionSummary(product)
    : product.protein === 'Sin especificar' ? 'Preparación casera' : product.protein;
  const selectedPrice = getProductOptionPrice(product, selectedOption);
  const selectedOrderKey = getProductOrderKey(product, selectedOption);
  const selectedQuantity = getProductOptionQuantity(quantities, product, selectedOption);
  const totalQuantity = getProductTotalQuantity(quantities, product);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image}
          alt={`${displayName} de Roxi Cocina`}
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
        {totalQuantity > 0 && <span className="selected-badge">En tu pedido · {totalQuantity}</span>}
      </div>

      <div className="product-body">
        <div className="product-heading">
          <div>
            <p className="product-protein">{proteinLabel}</p>
            <h3>{displayName}</h3>
          </div>
          <strong className="product-price">{formatPrice(selectedPrice)}</strong>
        </div>

        <p className="product-detail">{product.detail}</p>

        {options.length > 0 && (
          <div className="product-options" aria-label={`Opciones para ${displayName}`}>
            {options.map((option) => {
              const isSelected = selectedOption?.id === option.id;
              const optionQuantity = getProductOptionQuantity(quantities, product, option);

              return (
                <button
                  className={`product-option${isSelected ? ' is-active' : ''}`}
                  type="button"
                  key={option.id}
                  onClick={() => setSelectedOptionId(option.id)}
                  aria-pressed={isSelected}
                >
                  <span>
                    {option.label}
                    {option.priceModifier > 0 && <small>+{formatPrice(option.priceModifier)}</small>}
                  </span>
                  <strong>{formatPrice(getProductOptionPrice(product, option))}</strong>
                  {optionQuantity > 0 && <span className="product-option-count">{optionQuantity}</span>}
                </button>
              );
            })}
          </div>
        )}

        <div className="tag-list" aria-label="Etiquetas del producto">
          {visibleTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <div className="product-actions">
          <button className="button product-add" type="button" onClick={() => onAdd(selectedOrderKey)}>
            {selectedQuantity > 0 ? 'Agregar otro' : 'Agregar a mi pedido'}
          </button>
          <a className="text-link" href={getProductOrderUrl(product, selectedOption)} target="_blank" rel="noreferrer">
            Pedir este producto por WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
