import { platos } from "./data/platos.js";

// Número de WhatsApp de Roxi Cocina.
// Formato usado: Argentina +54 9 11 + número.
const WHATSAPP_NUMBER = "5491150978824";

// Contenedores donde se van a renderizar los platos.
const dayDishesContainer = document.querySelector("#day-dishes");
const fixedDishesContainer = document.querySelector("#fixed-dishes");

// Botones de filtro.
const filterButtons = document.querySelectorAll(".filter-btn");

// Secciones de platos.
const dishSections = document.querySelectorAll(".dish-group");

// Año automático del footer.
const currentYear = document.querySelector("#current-year");
currentYear.textContent = new Date().getFullYear();

/**
 * Formatea precios.
 * Si el precio está vacío, en null o como "Consultar",
 * muestra "Consultar".
 */
function formatPrice(price) {
  if (price === null || price === undefined || price === "" || price === "Consultar") {
    return "Consultar";
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Crea un enlace de WhatsApp con mensaje personalizado.
 */
function createWhatsappLink(dishName) {
  const message = `Hola Roxi Cocina, quiero pedir: ${dishName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Devuelve el texto visible de la etiqueta según el tipo de plato.
 */
function getBadgeText(dish) {
  if (dish.tipo === "dia") {
    return dish.diaTexto ? `Plato del día · ${dish.diaTexto}` : "Plato del día";
  }

  if (dish.tipo === "fijo") {
    return "Fijo";
  }

  return "Disponible";
}

/**
 * Genera una lista de variantes, gustos u opciones dentro de la tarjeta.
 */
function createOptionsList(options) {
  if (!options || options.length === 0) {
    return "";
  }

  const items = options.map((option) => `<li>${option}</li>`).join("");

  return `
    <ul class="dish-options">
      ${items}
    </ul>
  `;
}

/**
 * Crea la tarjeta HTML de cada plato.
 */
function createDishCard(dish) {
  const article = document.createElement("article");
  article.classList.add("dish-card");

  const hasImage = dish.imagen && dish.imagen.trim() !== "";
  const badgeText = getBadgeText(dish);
  const whatsappLink = createWhatsappLink(dish.titulo);

  article.innerHTML = `
    <div class="dish-image-wrapper">
      ${
        hasImage
          ? `
            <img
              src="${dish.imagen}"
              alt="${dish.alt || dish.titulo}"
              class="dish-image"
              loading="lazy"
            />
          `
          : `
            <div class="dish-placeholder" aria-label="Imagen no disponible">
              R
            </div>
          `
      }

      <span class="dish-badge ${dish.tipo}">
        ${badgeText}
      </span>
    </div>

    <div class="dish-content">
      <h4>${dish.titulo}</h4>

      <p class="dish-description">
        ${dish.descripcion}
      </p>

      ${createOptionsList(dish.opciones)}

      <div class="dish-footer">
        <span class="dish-price">
          ${formatPrice(dish.precio)}
        </span>

        <a
          href="${whatsappLink}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary btn-small dish-order"
          aria-label="Pedir ${dish.titulo} por WhatsApp"
        >
          Pedir este plato
        </a>
      </div>
    </div>
  `;

  return article;
}

/**
 * Renderiza los platos:
 * - Platos del día: muestra automáticamente el plato correspondiente al día actual.
 * - Platos fijos: muestra todos los platos fijos.
 */
function renderDishes() {
  dayDishesContainer.innerHTML = "";
  fixedDishesContainer.innerHTML = "";

  // Muestra todos los platos del día, sin filtrar por el día actual.
  const dayDishes = platos.filter((dish) => dish.tipo === "dia");

  // Muestra todos los platos fijos.
  const fixedDishes = platos.filter((dish) => dish.tipo === "fijo");

  if (dayDishes.length === 0) {
    dayDishesContainer.innerHTML = `
      <p class="empty-message">
        Todavía no hay platos del día cargados.
      </p>
    `;
  } else {
    dayDishes.forEach((dish) => {
      dayDishesContainer.appendChild(createDishCard(dish));
    });
  }

  if (fixedDishes.length === 0) {
    fixedDishesContainer.innerHTML = `
      <p class="empty-message">
        Todavía no hay platos fijos cargados.
      </p>
    `;
  } else {
    fixedDishes.forEach((dish) => {
      fixedDishesContainer.appendChild(createDishCard(dish));
    });
  }
}

/**
 * Aplica el filtro visual de secciones.
 * Filtros disponibles:
 * - todos
 * - dia
 * - fijo
 */
function applyFilter(filterValue) {
  dishSections.forEach((section) => {
    const sectionType = section.dataset.section;

    if (filterValue === "todos" || filterValue === sectionType) {
      section.classList.remove("hidden");
    } else {
      section.classList.add("hidden");
    }
  });
}

/**
 * Activa visualmente el botón seleccionado.
 */
function setActiveFilterButton(selectedButton) {
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  selectedButton.classList.add("active");
}

/**
 * Eventos de los botones de filtro.
 */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.dataset.filter;

    setActiveFilterButton(button);
    applyFilter(filterValue);
  });
});

// Inicialización.
renderDishes();
applyFilter("todos");