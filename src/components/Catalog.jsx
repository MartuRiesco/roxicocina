import { useMemo, useState } from 'react';
import { CATEGORY_ORDER, products } from '../data/products';
import { normalizeSearch } from '../utils/formatters';
import Filters from './Filters';
import ProductCard from './ProductCard';

export default function Catalog({ quantities, onAdd }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');

  const categories = useMemo(
    () => CATEGORY_ORDER.filter((item) => products.some((product) => (
      product.category === item || product.secondaryCategories?.includes(item)
    ))),
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);

    return products.filter((product) => {
      const categoryMatches = category === 'Todos'
        || product.category === category
        || product.secondaryCategories?.includes(category);

      const searchable = normalizeSearch([
        product.name,
        product.category,
        ...(product.secondaryCategories ?? []),
        product.protein,
        product.detail,
        ...product.tags,
      ].join(' '));

      const searchMatches = !normalizedQuery || searchable.includes(normalizedQuery);

      return product.available && categoryMatches && searchMatches;
    });
  }, [query, category]);

  const hasActiveFilters = Boolean(query.trim()) || category !== 'Todos';

  const clearFilters = () => {
    setQuery('');
    setCategory('Todos');
  };

  return (
    <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
      <div className="container">
        <div className="section-heading catalog-heading">
          <div>
            <p className="eyebrow">Nuestro catálogo</p>
            <h2 id="catalog-title">Elegí lo que querés tener listo</h2>
          </div>
          <p>
            Explorá todas las opciones, filtrá por tipo o buscá por nombre e ingrediente. Podés pedir un producto directo o armar una selección completa.
          </p>
        </div>

        <Filters
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <div className="results-bar" aria-live="polite">
          <p><strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'opción encontrada' : 'opciones encontradas'}</p>
          {hasActiveFilters && <span>El filtro y la búsqueda se actualizan al instante.</span>}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                quantity={quantities[product.id] ?? 0}
                onAdd={onAdd}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span aria-hidden="true">♡</span>
            <h3>No encontramos una opción con esos filtros</h3>
            <p>Probá con otra palabra o volvé a ver todo el catálogo.</p>
            <button className="button button-secondary" type="button" onClick={clearFilters}>Ver todas las opciones</button>
          </div>
        )}
      </div>
    </section>
  );
}
