import { useEffect, useMemo, useRef } from 'react';
import {
  formatPrice,
  formatPriceRange,
  getLinePriceRange,
  getOrderPriceRange,
} from '../utils/formatters';
import { getProductCartName, getProductVariantName } from '../utils/productOptions';
import { getCartOrderUrl } from '../utils/whatsapp';

const PLACEHOLDER = '/images/products/placeholder-roxi.svg';

export default function OrderDrawer({ open, onClose, items, onAdd, onDecrement, onRemove, onClear }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const totalUnits = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => getOrderPriceRange(items),
    [items],
  );

  return (
    <dialog
      className="order-dialog"
      ref={dialogRef}
      aria-labelledby="order-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="order-drawer">
        <div className="order-drawer-header">
          <div>
            <p className="eyebrow">Tu selección</p>
            <h2 id="order-title">Mi pedido</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar mi pedido">×</button>
        </div>

        {items.length === 0 ? (
          <div className="order-empty">
            <span aria-hidden="true">♡</span>
            <h3>Todavía no agregaste productos</h3>
            <p>Recorré el catálogo y sumá las viandas que quieras consultar.</p>
            <button className="button" type="button" onClick={onClose}>Volver al catálogo</button>
          </div>
        ) : (
          <>
            <div className="order-items">
              {items.map(({ product, quantity }) => {
                const orderKey = product.orderKey ?? product.id;
                const productName = getProductCartName(product);
                const displayName = product.selectedOption
                  ? getProductVariantName(product, product.selectedOption)
                  : product.name;

                return (
                  <article className="order-item" key={orderKey}>
                    <img
                      src={product.image}
                      alt=""
                      width="112"
                      height="84"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = PLACEHOLDER;
                      }}
                    />
                    <div className="order-item-copy">
                      <h3>{displayName}</h3>
                      {product.selectedOption && <span className="order-item-option">{product.selectedOption.label}</span>}
                      <p>{formatPrice(product.price)} c/u</p>
                      <div className="quantity-row">
                        <div className="quantity-control" aria-label={`Cantidad de ${productName}`}>
                          <button type="button" onClick={() => onDecrement(orderKey)} aria-label={`Quitar una unidad de ${productName}`}>−</button>
                          <span aria-live="polite">{quantity}</span>
                          <button type="button" onClick={() => onAdd(orderKey)} aria-label={`Agregar una unidad de ${productName}`}>+</button>
                        </div>
                        <button className="remove-button" type="button" onClick={() => onRemove(orderKey)}>Eliminar</button>
                      </div>
                    </div>
                    <strong className="order-line-total">{formatPriceRange(getLinePriceRange(product.price, quantity))}</strong>
                  </article>
                );
              })}
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Productos</span>
                <strong>{totalUnits}</strong>
              </div>
              <div className="summary-row summary-total">
                <span>Subtotal estimado</span>
                <strong>{formatPriceRange(subtotal)}</strong>
              </div>
              <p>El pedido se confirma por WhatsApp junto con disponibilidad, horario y coordinación de entrega.</p>
              <a className="button order-confirm" href={getCartOrderUrl(items)} target="_blank" rel="noreferrer">
                Enviar pedido por WhatsApp
              </a>
              <button className="clear-order" type="button" onClick={onClear}>Vaciar mi pedido</button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
