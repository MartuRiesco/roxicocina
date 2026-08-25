export default function Filters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className="filters-panel" aria-label="Filtros del catálogo">
      <div className="search-row">
        <label className="search-field">
          <span className="sr-only">Buscar productos</span>
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar pollo/carne, hongos, tarta, verdura..."
            autoComplete="off"
          />
        </label>
        <button className="clear-button" type="button" onClick={onClear} disabled={!hasActiveFilters}>
          Limpiar filtros
        </button>
      </div>

      <div className="filter-group">
        <span className="filter-label">Tipo</span>
        <div className="chip-scroll" role="group" aria-label="Filtrar por tipo de producto">
          <button
            className={`chip ${category === 'Todos' ? 'is-active' : ''}`}
            type="button"
            aria-pressed={category === 'Todos'}
            onClick={() => onCategoryChange('Todos')}
          >
            Todos
          </button>
          {categories.map((item) => (
            <button
              className={`chip ${category === item ? 'is-active' : ''}`}
              type="button"
              aria-pressed={category === item}
              onClick={() => onCategoryChange(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
