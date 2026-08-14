import { useMemo, useState } from 'react';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import HowToOrder from './components/HowToOrder';
import OrderDrawer from './components/OrderDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import { products } from './data/products';
import { useOrder } from './hooks/useOrder';
import { getOrderItems } from './utils/productOptions';

export default function App() {
  const [orderOpen, setOrderOpen] = useState(false);
  const { quantities, totalUnits, add, decrement, remove, clear } = useOrder();

  const orderItems = useMemo(
    () => getOrderItems(products, quantities),
    [quantities],
  );

  return (
    <>
      <a className="skip-link" href="#catalogo">Saltar al catálogo</a>
      <Header orderCount={totalUnits} onOpenOrder={() => setOrderOpen(true)} />
      <Hero />
      <Catalog quantities={quantities} onAdd={add} />
      <HowToOrder />
      <Footer />

      <WhatsAppButton elevated={totalUnits > 0} />

      {totalUnits > 0 && (
        <button className="mobile-order-bar" type="button" onClick={() => setOrderOpen(true)}>
          <span>Ver pedido</span>
          <strong>{totalUnits} {totalUnits === 1 ? 'producto' : 'productos'}</strong>
        </button>
      )}

      <OrderDrawer
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        items={orderItems}
        onAdd={add}
        onDecrement={decrement}
        onRemove={remove}
        onClear={clear}
      />
    </>
  );
}
