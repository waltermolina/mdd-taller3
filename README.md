# GreenShop · Laboratorio de análisis CX

Material Didáctico Digital para una asignatura universitaria de Inteligencia de Negocios. Simula el análisis de tres situaciones de Customer Experience, con selección de touchpoints, fuentes, KPIs y decisiones, retroalimentación experta, matriz CX-Datos e informe ejecutivo.

## Uso

Abrí `index.html` en un navegador moderno. No requiere instalación, compilación, conexión a Internet ni dependencias externas.

Explorá el Customer Journey y analizá las tres situaciones en cualquier orden. Las respuestas correctas habilitan el siguiente paso; al finalizar la síntesis experta, marcá el problema como resuelto. El tablero contabiliza fuentes y KPIs **únicos validados**, decisiones correctas y problemas resueltos, sin duplicarlos al revisar un análisis. Los casos resueltos se pueden revisar en modo de solo lectura.

El avance se conserva solo en memoria durante la sesión: recargar la página lo reinicia. El informe se puede imprimir o guardar como PDF desde el navegador. Los datos y las recomendaciones pertenecen a un caso académico; no son mediciones de una organización real.

## Publicación

Para GitHub Pages, publicá la carpeta raíz de la rama que contiene `index.html`, `styles.css` y `script.js` desde **Settings → Pages**.

Para Moodle, publicá primero la aplicación en una URL HTTPS e incrustala con un iframe en un recurso que permita HTML:

```html
<iframe
  src="https://waltermolina.github.io/mdd-taller3/"
  title="GreenShop: análisis de Customer Experience"
  width="100%"
  height="900"
  style="border: 0;"
  loading="lazy">
</iframe>
```

La instancia de Moodle debe permitir iframes y el dominio de publicación. La interfaz se adapta al ancho disponible e incluye navegación por teclado, etiquetas accesibles, avisos de validación y respeto por la preferencia de movimiento reducido.