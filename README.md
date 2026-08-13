# Roxi Cocina — Viandas caseras

Proyecto React + JavaScript + Vite para el catálogo de Roxi Cocina.

## Requisitos

- Node.js compatible con Vite 8.
- npm.

## Desarrollo local

```bash
npm install
npm run dev
```

Vite mostrará en terminal la URL local del servidor de desarrollo.

## Build de producción

```bash
npm run build
npm run preview
```

El build se genera en `dist/`.

## Despliegue en Vercel

### Desde Git

1. Subí esta carpeta a un repositorio de GitHub/GitLab/Bitbucket.
2. Importá el repositorio desde Vercel.
3. Vercel detectará Vite. Si te pide configuración manual:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Desplegá.

### Desde Vercel CLI

```bash
npm install -g vercel
vercel
```

Para un deploy directo de producción:

```bash
vercel --prod
```

## Fotografías de productos

Guardá todas las fotos en:

```text
public/images/products/
```

El código ya apunta a nombres de archivo específicos. Si una foto todavía no existe, se usa automáticamente `placeholder-roxi.svg`.

Para reemplazar un placeholder, exportá la foto preferentemente en WebP, mantené el nombre exacto y copiala dentro de `public/images/products/`.

Nombres esperados:

```text
pollo-verdeo-pure.webp
pollo-verdeo-doble.webp
pollo-hongos-pure.webp
pollo-hongos-doble.webp
risotto-hongos.webp
guiso-lentejas.webp
noquis-salsa.webp
pastel-papa-calabaza.webp
tarta-verdura-queso.webp
tarta-jamon-queso.webp
tarta-zapallitos-queso.webp
tarta-cebolla-queso.webp
tarta-calabaza-choclo.webp
tarta-calabaza-pollo.webp
empanada-vacio-congelada.webp
empanada-verdura-queso.webp
empanada-carne.webp
empanada-jamon-queso.webp
focaccia-individual.webp
milanesas-peceto-panko.webp
milanesas-pollo-panko.webp
carne-vegetales-horno.webp
canelones-ricota-verdura.webp
tortilla-verdura.webp
wok-mixto-lomo-pollo.webp
wok-vegetales.webp
bondiola-barbacoa-pure-batatas.webp
berenjenas-parmigiana.webp
zapallitos-revueltos.webp
chipa-10.webp
cookie-xl.webp
cheesecake-frutos-rojos.webp
tiramisu.webp
chocotorta.webp
```

Las cards usan una relación 4:3 y `object-fit: cover`, por lo que conviene exportar las imágenes con encuadres similares. Un tamaño práctico es 1200 × 900 px o equivalente 4:3.

## Administración del catálogo

Los productos están centralizados en:

```text
src/data/products.js
```

Para cambiar precio, disponibilidad, categoría, proteína, tags o ruta de imagen, editá únicamente el objeto correspondiente en ese archivo.

## WhatsApp

El número está centralizado en:

```text
src/utils/whatsapp.js
```

Número utilizado en todo el proyecto:

```text
5491150978824
```

No es necesario editar cada componente por separado.
