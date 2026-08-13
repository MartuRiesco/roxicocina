import { useEffect, useMemo, useRef } from 'react';
import { formatPrice } from '../utils/formatters';
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
    () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
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
              {items.map(({ product, quantity }) => (
                <article className="order-item" key={product.id}>
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
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)} c/u</p>
                    <div className="quantity-row">
                      <div className="quantity-control" aria-label={`Cantidad de ${product.name}`}>
                        <button type="button" onClick={() => onDecrement(product.id)} aria-label={`Quitar una unidad de ${product.name}`}>−</button>
                        <span aria-live="polite">{quantity}</span>
                        <button type="button" onClick={() => onAdd(product.id)} aria-label={`Agregar una unidad de ${product.name}`}>+</button>
                      </div>
                      <button className="remove-button" type="button" onClick={() => onRemove(product.id)}>Eliminar</button>
                    </div>
                  </div>
                  <strong className="order-line-total">{formatPrice(product.price * quantity)}</strong>
                </article>
              ))}
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Productos</span>
                <strong>{totalUnits}</strong>
              </div>
              <div className="summary-row summary-total">
                <span>Subtotal estimado</span>
                <strong>{formatPrice(subtotal)}</strong>
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
