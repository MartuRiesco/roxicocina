/**
 * Archivo de datos de Roxi Cocina.
 *
 * Tipos disponibles:
 * - "dia"  = Plato del día automático según la semana
 * - "fijo" = Plato fijo disponible siempre
 *
 * Para platos del día, usar:
 * diaSemana:
 * 1 = lunes
 * 2 = martes
 * 3 = miércoles
 * 4 = jueves
 * 5 = viernes
 *
 * Si no tenés imagen, dejá imagen: ""
 *
 * Si no querés cargar precio todavía, usá:
 * precio: "Consultar"
 */

export const platos = [
  /**
   * PLATOS FIJOS
   */

  {
    titulo: "Tarta",
    descripcion: "Tartas caseras con diferentes gustos disponibles con ensalada de lechuga y tomate.",
    precio: "$10.000",
    imagen: "https://i.ibb.co/hxg2PTFD/Chat-GPT-Image-27-may-2026-18-07-38.png",
    alt: "Tarta casera Roxi Cocina",
    tipo: "fijo",
    opciones: [
      "Verdura",
      "Zapallitos",
      "Jamón y queso",
      "Calabaza, choclo, cebolla y queso",
      "Cebolla, panceta y queso"
    ]
  },
  {
    titulo: "Milanesa con guarnición",
    descripcion: "Milanesa casera a elección, acompañada con guarnición.",
    precio: "$12.000",
    imagen: "https://i.ibb.co/WWrxYFDT/Chat-GPT-Image-27-may-2026-18-05-46.png",
    alt: "Milanesa casera con guarnición",
    tipo: "fijo",
    opciones: [
      "Milanesa de carne",
      "Milanesa de pollo",
      "Milanesa de soja",
      "Guarnición: puré de papa",
      "Guarnición: ensalada"
    ]
  },
  {
    titulo: "Empanadas",
    descripcion: "Empanadas caseras al horno con rellenos sabrosos.",
    precio: "$2500 C/U",
    imagen: "https://i.ibb.co/60GFqtFQ/Chat-GPT-Image-27-may-2026-18-11-46.png",
    alt: "Empanadas caseras Roxi Cocina",
    tipo: "fijo",
    opciones: [
      "Vacío",
      "Verdura y queso",
      "Carne tradicional"
    ]
  },
{
  titulo: "Ensalada del día",
  descripcion: "Ensalada fresca del día. Consultar variedad disponible. Se puede agregar pollo o atún por un adicional.",
  precio: "$10.000",
  imagen: "https://i.ibb.co/JWFTYsm9/Chat-GPT-Image-27-may-2026-18-10-09.png",
  alt: "Ensalada fresca del día",
  tipo: "fijo",
  opciones: [
    "Consultar opción disponible",
    "Agregar pollo: +$2.000",
    "Agregar atún: +$2.000"
  ]
},

  /**
   * PLATOS DEL DÍA
   */

  {
    titulo: "Pollo al verdeo",
    descripcion: "Plato casero del lunes. Pollo al verdeo cremoso y sabroso.",
    precio: "$12.000",
    imagen: "https://i.ibb.co/991g0ptw/Chat-GPT-Image-27-may-2026-16-28-16.png",
    alt: "Pollo al verdeo casero",
    tipo: "dia",
    diaSemana: 1,
    diaTexto: "Lunes"
  },
  {
    titulo: "Guiso de lentejas",
    descripcion: "Plato casero del martes. Guiso abundante, calentito y bien condimentado.",
    precio: "$12.000",
    imagen: "https://i.ibb.co/Q7fdtv5W/Chat-GPT-Image-27-may-2026-16-32-50.png",
    alt: "Guiso de lentejas casero",
    tipo: "dia",
    diaSemana: 2,
    diaTexto: "Martes"
  },
  {
    titulo: "Risotto de hongos",
    descripcion: "Plato casero del miércoles. Risotto cremoso con hongos.",
    precio: "$12.000",
    imagen: "https://i.ibb.co/xKQt5J19/Chat-GPT-Image-27-may-2026-16-35-18.png",
    alt: "Risotto de hongos",
    tipo: "dia",
    diaSemana: 3,
    diaTexto: "Miércoles"
  },
  {
    titulo: "Ñoquis con salsa",
    descripcion: "Plato casero del jueves. Ñoquis con salsa de tomate.",
    precio: "$12.000",
    imagen: "https://i.ibb.co/sv6BV9Pq/Chat-GPT-Image-27-may-2026-16-36-47.png",
    alt: "Ñoquis caseros con salsa",
    tipo: "dia",
    diaSemana: 4,
    diaTexto: "Jueves"
  },
  {
    titulo: "Pastel de papa",
    descripcion: "Plato casero del viernes. Pastel de papa clásico, gratinado al horno.",
    precio: "$12.000",
    imagen: "https://i.ibb.co/Xxbvr75G/Chat-GPT-Image-27-may-2026-16-38-53.png",
    alt: "Pastel de papa casero",
    tipo: "dia",
    diaSemana: 5,
    diaTexto: "Viernes"
  }
];